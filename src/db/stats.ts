import { getDB } from '../utils/db'

interface DBStats {
  vn: number
  tags: number
  releases: number
  producers: number
  staff: number
  characters: number
  traits: number
}

/**
 * Get the statistics related to the VNDB database
 */
const dbstats = async (): Promise<DBStats> => {
  const dbstats: DBStats = {
    vn: 0,
    tags: 0,
    releases: 0,
    producers: 0,
    staff: 0,
    characters: 0,
    traits: 0,
  }

  const database = await getDB()

  const result = await Promise.all([
    database.query('SELECT COUNT(id) FROM vn', []),
    database.query('SELECT COUNT(id) FROM tags', []),
    database.query('SELECT COUNT(id) FROM releases', []),
    database.query('SELECT COUNT(id) FROM producers', []),
    database.query('SELECT COUNT(id) FROM staff', []),
    database.query('SELECT COUNT(id) FROM chars', []),
    database.query('SELECT COUNT(id) FROM traits', []),
  ])

  dbstats.vn = result[0].rows[0].count
  dbstats.tags = result[1].rows[0].count
  dbstats.releases = result[2].rows[0].count
  dbstats.producers = result[3].rows[0].count
  dbstats.staff = result[4].rows[0].count
  dbstats.characters = result[5].rows[0].count
  dbstats.traits = result[6].rows[0].count
  return dbstats
}

export { dbstats }
