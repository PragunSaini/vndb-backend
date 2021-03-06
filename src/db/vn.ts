import { getDB, Database } from '../utils/db'
import { DatabaseError } from '../utils/errors'
import { groupBy, combineBy, combineByAll } from '../utils/helpers'
import { mapAnimeType, mapVnRelation, mapVnlength, mapLanguage, mapRelease } from '../utils/mappers'
import { logger } from '../utils/logger'

interface VNResult {
  vn?: any
  wikidata?: any
  staff?: any[]
  relations?: any[]
  anime?: any[]
  publishers?: any[]
  developers?: any[]
  releases?: any[]
  screenshots?: any[]
  tags?: any[]
  chars?: any[]
  releaseinfo?: any[]
  ratings?: any[]
}

async function getWikidata(wikiId: number, database: Database): Promise<any> {
  const res = await database.query('SELECT * FROM wikidata WHERE id = $1', [wikiId])
  return res.rows.length > 0 ? res.rows[0] : null
}

async function getStaff(vnid: number, database: Database): Promise<any> {
  const res = await database.query(
    'SELECT vst.aid, sta.id, vst.role, vst.note, sta.name, sta.original\
    FROM vn_staff vst INNER JOIN staff_alias sta USING(aid)\
    WHERE vst.id = $1',
    [vnid]
  )

  if (res.rows.length > 0) {
    const groupedByRole = groupBy(res.rows, 'role')
    return groupedByRole
  }

  return res.rows.length > 0 ? res.rows : null
}

async function getPublishers(vnid: number, database: Database): Promise<any> {
  const res = await database.query(
    'SELECT DISTINCT rprod.pid, prod.name, rlang.lang\
    FROM releases_vn rvn JOIN releases_producers rprod ON rvn.id = rprod.id\
    INNER JOIN releases_lang rlang ON rlang.id = rvn.id\
    INNER JOIN producers prod ON rprod.pid = prod.id\
    WHERE rvn.vid = $1 AND rprod.publisher',
    [vnid]
  )

  if (res.rows.length > 0) {
    const groupedByLang = groupBy(res.rows, 'lang')
    groupedByLang.forEach(group => mapLanguage(group, 'lang'))
    return groupedByLang
  }
  return null
}

async function getDevelopers(vnid: number, database: Database): Promise<any> {
  const res = await database.query(
    'SELECT DISTINCT rprod.pid, prod.name\
    FROM releases_vn rvn JOIN releases_producers rprod ON rvn.id = rprod.id\
    JOIN releases_lang rlang ON rlang.id = rvn.id\
    JOIN producers prod ON rprod.pid = prod.id\
    WHERE rvn.vid = $1 AND rprod.developer',
    [vnid]
  )
  return res.rows.length > 0 ? res.rows : null
}

async function getRelations(vnid: number, database: Database): Promise<any> {
  const res = await database.query(
    'SELECT vn1.id AS "vid", vnr.relation, vnr.official, vn2.id, vn2.title\
    FROM vn vn1 JOIN vn_relations vnr ON vn1.id = vnr.vid JOIN vn vn2 ON vnr.id = vn2.id\
    WHERE vn1.id = $1',
    [vnid]
  )

  if (res.rows.length > 0) {
    const groupedByRelation = groupBy(res.rows, 'relation')
    groupedByRelation.forEach(relGrp => mapVnRelation(relGrp, 'relation'))
    return groupedByRelation
  }

  return null
}

async function getReleases(vnid: number, database: Database): Promise<any> {
  const res = await database.query(
    'SELECT rv.vid, rel.*, rel.id, rlang.lang, rmed.medium, rmed.qty, rplat.platform \
    FROM releases rel \
    INNER JOIN releases_vn rv ON rel.id = rv.id \
    LEFT JOIN releases_lang rlang ON rel.id = rlang.id \
    LEFT JOIN releases_media rmed ON rel.id = rmed.id \
    LEFT JOIN releases_platforms rplat ON rel.id = rplat.id \
    WHERE rv.vid = $1',
    [vnid]
  )

  if (res.rows.length > 0) {
    const groupByLang = groupBy(res.rows, 'lang')
    groupByLang.forEach(group => mapLanguage(group, 'lang'))
    groupByLang.forEach(group => group.rows.forEach(rel => mapRelease(rel)))
    const combineByRelease = groupByLang.map(group => {
      return { ...group, rows: combineBy(group.rows, 'id', 'medium', 'qty', 'platform') }
    })
    return combineByRelease
  }

  return null
}

async function getScreenshots(vnid: number, database: Database): Promise<any> {
  const res = await database.query(
    'SELECT scr, rid, width, height, nsfw \
    FROM vn_screenshots vs \
    INNER JOIN images im ON vs.scr = im.id \
    WHERE vs.id = $1',
    [vnid]
  )

  if (res.rows.length > 0) {
    const groupByRelease = groupBy(res.rows, 'rid')
    return groupByRelease
  }
  return null
}

async function getTags(vnid: number, database: Database): Promise<any> {
  const res = await database.query(
    'SELECT t.id, t.name, tv.vid, tv.ignore, COUNT(tv.uid) AS "votes", \
            ROUND(AVG(tv.spoiler), 2) AS "spoiler", ROUND(AVG(vote), 1) AS "rating" \
    FROM tags t INNER JOIN tags_vn tv ON t.id = tv.tag \
    WHERE tv.vid = $1 \
    GROUP BY tv.vid, t.id, tv.ignore',
    [vnid]
  )

  return res.rows.length > 0 ? res.rows : null
}

async function getChars(vnid: number, database: Database): Promise<any> {
  const res = await database.query(
    'SELECT c.*, cv.*, sta.id AS "sei_id", sta.aid AS "sei_aid", \
            sta.name AS "sei_name", vs.note, \
            rel.title AS "rel_title" \
    FROM chars_vns cv \
    INNER JOIN chars c USING(id) \
    LEFT JOIN vn_seiyuu vs ON vs.cid = c.id AND vs.id = cv.vid \
    LEFT JOIN staff_alias sta ON vs.aid = sta.aid \
    LEFT JOIN releases rel ON cv.rid = rel.id \
    WHERE cv.vid = $1 ORDER BY role',
    [vnid]
  )

  const traitQuery = `WITH RECURSIVE trait_root(trait, parent, lvl) AS (
      SELECT tp.trait, tp.parent, 1 AS lvl FROM traits_parents tp
      WHERE trait IN (Select tid FROM chars_traits WHERE id = $1)
      UNION ALL
      SELECT tr.trait, tp.parent, lvl + 1 AS lvl FROM traits_parents tp
      INNER JOIN trait_root tr ON tp.trait = tr.parent
    ),
    root_groups AS (
      SELECT tr.*, ROW_NUMBER() OVER (PARTITION BY tr.trait ORDER BY tr.lvl DESC) AS rows
      FROM trait_root tr
    )
    SELECT rg.trait, tr1.name AS "trait_name", ct.spoil AS "spoiler", rg.parent, tr2.name AS "parent_name"
    FROM root_groups rg INNER JOIN traits tr1 ON rg.trait = tr1.id INNER JOIN traits tr2 ON rg.parent = tr2.id
    INNER JOIN chars_traits ct ON rg.trait = ct.tid AND ct.id = $1
    WHERE rg.rows = 1 ORDER BY parent;`

  if (res.rows.length > 0) {
    const groupByChar = combineBy(res.rows, 'id', 'sei_id', 'sei_aid', 'sei_name', 'note')

    // Now we need to get all the traits of this character
    // TODO - make these awaits be called asynchronously and resolve using Promise.all
    for (const char of groupByChar) {
      const charTraits = await database.query(traitQuery, [char.id])
      char.traits = combineByAll(charTraits.rows, 'parent', 'trait', 'trait_name', 'spoiler', 'parent_name')
    }

    return groupByChar
  }

  return null
}

async function getAnime(vnid: number, database: Database): Promise<any> {
  const res = await database.query(
    'Select * FROM anime JOIN vn_anime ON anime.id = vn_anime.aid WHERE vn_anime.id = $1',
    [vnid]
  )

  if (res.rows.length > 0) {
    res.rows.forEach(anime => {
      if (anime.type) {
        mapAnimeType(anime, 'type')
      }
    })

    return res.rows
  }

  return null
}

async function getReleaseInfo(vnid: number, database: Database): Promise<any> {
  const res = await database.query(
    'SELECT lang, released FROM \
      (Select lang, released, row_number() OVER (ORDER BY released ASC) AS rn \
      FROM releases \
      INNER JOIN releases_vn USING(id) \
      INNER JOIN releases_lang USING(id) \
      WHERE vid = $1) as list WHERE rn = 1',
    [vnid]
  )

  return res.rows.length > 0 ? res.rows[0] : null
}

async function getVnRanks(vnid: number, database: Database): Promise<any> {
  const query1 = await database.query(
    'SELECT r FROM \
      (SELECT id, row_number() OVER (ORDER BY c_popularity DESC) AS r FROM vn \
      WHERE c_popularity IS NOT NULL) AS vnp \
    WHERE vnp.id = $1',
    [vnid]
  )
  const query2 = await database.query(
    'SELECT r FROM \
      (SELECT id, row_number() OVER (ORDER BY c_rating DESC) AS r FROM vn \
      WHERE c_rating IS NOT NULL) AS vnr \
    WHERE vnr.id = $1',
    [vnid]
  )
  let [popularityRank, ratingRank] = await Promise.all([query1, query2])

  if (popularityRank.rows.length > 0) {
    popularityRank = popularityRank.rows[0].r
  } else {
    popularityRank = null as any
  }
  if (ratingRank.rows.length > 0) {
    ratingRank = ratingRank.rows[0].r
  } else {
    ratingRank = null as any
  }

  return { popularityRank, ratingRank }
}

/**
 * Get's all the metadata related to the requested VN
 * @param id Visual Novel's VNDB id
 */
const getvn = async (id: number): Promise<VNResult> => {
  const vnresult: VNResult = {}
  const database = await getDB()

  // Get the VN from the database if present
  const res = await database.query('SELECT * FROM vn WHERE id = $1', [id])
  if (res.rows.length == 0) {
    throw new DatabaseError('VNNOTFOUND', `VN with id ${id} does not exist`)
  }
  vnresult.vn = res.rows[0]

  mapVnlength(vnresult.vn, 'length')

  const promises: Promise<any>[] = []

  // If wikidata present, fetch it
  if (vnresult.vn.l_wikidata) {
    promises.push(getWikidata(parseInt(vnresult.vn?.l_wikidata, 10), database))
  } else {
    vnresult.wikidata = null
  }

  // Get the release info
  promises.push(getReleaseInfo(id, database))

  // Get the staff details for this vn
  promises.push(getStaff(id, database))

  // Get the relations to other vn
  promises.push(getRelations(id, database))

  // Get the related anime
  promises.push(getAnime(id, database))

  // Get the producers list by language
  promises.push(getPublishers(id, database))

  // Get the developers list
  promises.push(getDevelopers(id, database))

  // Get the releases
  promises.push(getReleases(id, database))

  // // Get screenshot ids
  promises.push(getScreenshots(id, database))

  // Get the tags
  promises.push(getTags(id, database))

  // Get the characters
  promises.push(getChars(id, database))

  // Get VN ranks
  promises.push(getVnRanks(id, database))

  if (vnresult.vn.l_wikidata) {
    ;[
      vnresult.wikidata,
      vnresult.releaseinfo,
      vnresult.staff,
      vnresult.relations,
      vnresult.anime,
      vnresult.publishers,
      vnresult.developers,
      vnresult.releases,
      vnresult.screenshots,
      vnresult.tags,
      vnresult.chars,
      vnresult.ratings,
    ] = await Promise.all(promises)
  } else {
    ;[
      vnresult.releaseinfo,
      vnresult.staff,
      vnresult.relations,
      vnresult.anime,
      vnresult.publishers,
      vnresult.developers,
      vnresult.releases,
      vnresult.screenshots,
      vnresult.tags,
      vnresult.chars,
      vnresult.ratings,
    ] = await Promise.all(promises)
  }

  return vnresult
}

export { getvn }
