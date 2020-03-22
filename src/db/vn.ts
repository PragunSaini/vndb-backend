import { getDB, Database } from './db'
import { DatabaseError } from '../utils/errors'
import { groupBy, combineBy } from '../utils/helpers'

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
    JOIN releases_lang rlang ON rlang.id = rvn.id\
    JOIN producers prod ON rprod.pid = prod.id\
    WHERE rvn.vid = $1 AND rprod.publisher',
    [vnid]
  )

  if (res.rows.length > 0) {
    const groupedByLang = groupBy(res.rows, 'lang')
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
    const combineByRelease = groupByLang.map(group => {
      return { ...group, rows: combineBy(group.rows, 'id', 'medium', 'qty', 'platform') }
    })
    return combineByRelease
  }

  return null
}

async function getScreenshots(vnid: number, database: Database): Promise<any> {
  const res = await database.query(
    'SELECT * FROM vn_screenshots vs \
    INNER JOIN screenshots s ON vs.scr = s.id \
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
    INNER JOIN vn_seiyuu vs ON vs.cid = c.id AND vs.id = cv.vid \
    INNER JOIN staff_alias sta ON vs.aid = sta.aid \
    LEFT JOIN releases rel ON cv.rid = rel.id \
    WHERE cv.vid = $1',
    [vnid]
  )

  if (res.rows.length > 0) {
    const groupByChar = groupBy(res.rows, 'id')
    return groupByChar
  }

  return null
}

async function getAnime(vnid: number, database: Database): Promise<any> {
  const res = await database.query(
    'Select * FROM anime JOIN vn_anime ON anime.id = vn_anime.aid WHERE vn_anime.id = $1',
    [vnid]
  )
  return res.rows.length > 0 ? res.rows : null
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

  // Get screenshot ids
  promises.push(getScreenshots(id, database))

  // Get the tags
  promises.push(getTags(id, database))

  // Get the characters
  promises.push(getChars(id, database))

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
    ] = await Promise.all(promises)
  }

  return vnresult
}

export { getvn }
