import { database } from './db'
import { QueryResult } from 'pg'

const dbstats = async (): Promise<object> => {
  const dbstats = {
    vn: 0,
    tags: 0,
    releases: 0,
    producers: 0,
    staff: 0,
    characters: 0,
    traits: 0,
  }
  let res: QueryResult<any>
  res = await database.query('SELECT COUNT(id) FROM vn', [])
  dbstats.vn = res.rows[0].count
  res = await database.query('SELECT COUNT(id) FROM tags', [])
  dbstats.tags = res.rows[0].count
  res = await database.query('SELECT COUNT(id) FROM releases', [])
  dbstats.releases = res.rows[0].count
  res = await database.query('SELECT COUNT(id) FROM producers', [])
  dbstats.producers = res.rows[0].count
  res = await database.query('SELECT COUNT(id) FROM staff', [])
  dbstats.staff = res.rows[0].count
  res = await database.query('SELECT COUNT(id) FROM chars', [])
  dbstats.characters = res.rows[0].count
  res = await database.query('SELECT COUNT(id) FROM traits', [])
  dbstats.traits = res.rows[0].count

  return dbstats
}

export { dbstats }
