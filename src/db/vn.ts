import { database } from './db'
import { DatabaseError } from '../utils/errors'
import { logger } from '../utils/logger'

interface VNResult {
  vn?: any
  wikidata?: any
  staff?: any[]
  relations?: any[]
  anime?: any[]
  producers?: any[]
  developers?: any[]
  releases?: any[]
  screenshots?: any[]
  tags?: any[]
  chars?: any[]
}

async function getWikidata(wikiId: number): Promise<any> {
  const res = await database.query('SELECT * FROM wikidata WHERE id = $1', [wikiId])
  return res.rows[0]
}

async function getStaff(vnid: number): Promise<any> {
  const res = await database.query(
    'SELECT vst.aid, st.id, vst.role, vst.note, sta.name, sta.original\
    FROM vn_staff vst JOIN staff st USING(aid) JOIN staff_alias sta USING(aid)\
    WHERE vst.id = $1',
    [vnid]
  )
  return res.rows.length > 0 ? res.rows : null
}

async function getProducers(vnid: number): Promise<any> {
  const res = await database.query(
    'SELECT DISTINCT rprod.pid, prod.name, rlang.lang\
    FROM releases_vn rvn JOIN releases_producers rprod ON rvn.id = rprod.id\
    JOIN releases_lang rlang ON rlang.id = rvn.id\
    JOIN producers prod ON rprod.pid = prod.id\
    WHERE rvn.vid = $1 AND rprod.publisher',
    [vnid]
  )
  return res.rows.length > 0 ? res.rows : null
}

async function getDevelopers(vnid: number): Promise<any> {
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

async function getRelations(vnid: number): Promise<any> {
  const res = await database.query(
    'SELECT vn1.id AS "vid", vnr.relation, vnr.official, vn2.id, vn2.title\
    FROM vn vn1 JOIN vn_relations vnr ON vn1.id = vnr.vid JOIN vn vn2 ON vnr.id = vn2.id\
    WHERE vn1.id = $1',
    [vnid]
  )
  return res.rows.length > 0 ? res.rows : null
}

async function getReleases(vnid: number): Promise<any> {
  const res = await database.query(
    'SELECT r.*, rlan.*, rprod.*, rplat.*, rmed.* FROM \
    releases r INNER JOIN releases_vn rvn ON r.id = rvn.id \
    INNER JOIN releases_media rmed ON r.id = rmed.id \
    INNER JOIN releases_platforms rplat ON r.id = rplat.id \
    INNER JOIN releases_producers rprod ON r.id = rprod.id \
    INNER JOIN releases_lang rlan ON r.id = rlan.id \
    WHERE rvn.vid = $1',
    [vnid]
  )
  return res.rows.length > 0 ? res.rows : null
}

async function getScreenshots(vnid: number): Promise<any> {
  const res = await database.query(
    'SELECT * FROM vn_screenshots vs \
    INNER JOIN screenshots s ON vs.scr = s.id \
    WHERE vs.id = $1',
    [vnid]
  )
  return res.rows.length > 0 ? res.rows : null
}

async function getTags(vnid: number): Promise<any> {
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

async function getChars(vnid: number): Promise<any> {
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

  return res.rows.length > 0 ? res.rows : null
}

async function getAnime(vnid: number): Promise<any> {
  const res = await database.query(
    'Select * FROM anime JOIN vn_anime ON anime.id = vn_anime.aid WHERE vn_anime.id = $1',
    [vnid]
  )
  return res.rows.length > 0 ? res.rows : null
}

const getvn = async (id: number): Promise<VNResult> => {
  const vnresult: VNResult = {}

  // Get the VN from the database if present
  const res = await database.query('SELECT * FROM vn WHERE id = $1', [id])
  if (res.rows.length == 0) {
    throw new DatabaseError('VNNOTFOUND', `VN with id ${id} does not exist`)
  }
  vnresult.vn = res.rows[0]

  const promises: Promise<any>[] = []

  // If wikidata present, fetch it
  if (vnresult.vn.l_wikidata) {
    promises.push(getWikidata(parseInt(vnresult.vn?.l_wikidata, 10)))
  } else {
    vnresult.wikidata = null
  }

  // Get the staff details for this vn
  promises.push(getStaff(id))

  // Get the relations to other vn
  promises.push(getRelations(id))

  // Get the related anime
  promises.push(getAnime(id))

  // Get the producers list by language
  promises.push(getProducers(id))

  // Get the developers list
  promises.push(getDevelopers(id))

  // Get the releases
  promises.push(getReleases(id))

  // Get screenshot ids
  promises.push(getScreenshots(id))

  // Get the tags
  promises.push(getTags(id))

  // Get the characters
  promises.push(getChars(id))

  if (vnresult.vn.l_wikidata) {
    ;[
      vnresult.wikidata,
      vnresult.staff,
      vnresult.relations,
      vnresult.anime,
      vnresult.producers,
      vnresult.developers,
      vnresult.releases,
      vnresult.screenshots,
      vnresult.tags,
      vnresult.chars,
    ] = await Promise.all(promises)
  } else {
    ;[
      vnresult.staff,
      vnresult.relations,
      vnresult.anime,
      vnresult.producers,
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

// TODO
// characters
