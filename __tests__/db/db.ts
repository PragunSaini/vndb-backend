import { connectDB, getDB, endDB, Database } from '../../src/db/db'

describe('Database interface', () => {
  jest.useFakeTimers()
  let database: Database

  beforeAll(async () => {
    connectDB()
    database = await getDB()
  })

  test('Single Query', async () => {
    expect(database.totalCount()).toBe(0)
    const res = await database.query('SELECT * FROM vn', [])
    expect(database.totalCount()).toBe(1)
    expect(res.rows.length).toBeGreaterThan(0)
  })

  test('Multiple queries', async () => {
    const res1 = database.query('SELECT COUNT(*), MIN(id), MAX(id) FROM vn GROUP BY length ORDER BY length ASC', [])
    const res2 = database.query('SELECT COUNT(*) FROM releases', [])
    const result = await Promise.all([res1, res2])
    expect([1, 2]).toContain(database.totalCount())
    expect(result[0].rows.length).toBeGreaterThan(0)
    expect(result[0].rows.length).toBeLessThan(7)
    expect(result[1].rows.length).toBeGreaterThan(0)
  })

  test('Using a client', async () => {
    const client = await database.getClient()
    const res1 = client.query('SELECT * FROM vn')
    const res2 = client.query('SELECT * FROM tags')
    const result = await Promise.all([res1, res2])
    await client.release()
    expect(database.totalCount()).toBeLessThan(3)
    expect(result[0].rows.length).toBeGreaterThan(0)
    expect(result[1].rows.length).toBeGreaterThan(0)
  })

  afterAll(async () => {
    await endDB()
  })
})
