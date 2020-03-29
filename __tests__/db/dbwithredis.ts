import { connectDB, getDB, endDB } from '../../src/utils/db'
import { startRedis, killRedis, redis } from '../../src/utils/redis'

describe('Database with redis based switching', () => {
  jest.useFakeTimers()
  jest.setTimeout(30000)

  beforeAll(async () => {
    startRedis()
    connectDB()
    await redis.set('database', 'main')
  })

  test('Single Query', async () => {
    const database = await getDB()
    expect(database.totalCount()).toBe(0)
    const res = await database.query('SELECT * FROM vn', [])
    expect(database.totalCount()).toBe(1)
    expect(res.rows.length).toBeGreaterThan(0)
  })

  test('Multiple queries', async () => {
    const database = await getDB()
    const res1 = database.query('SELECT COUNT(*), MIN(id), MAX(id) FROM vn GROUP BY length ORDER BY length ASC', [])
    const res2 = database.query('SELECT COUNT(*) FROM releases', [])
    const result = await Promise.all([res1, res2])
    expect([1, 2]).toContain(database.totalCount())
    expect(result[0].rows.length).toBeGreaterThan(0)
    expect(result[0].rows.length).toBeLessThan(7)
    expect(result[1].rows.length).toBeGreaterThan(0)
  })

  test('Using a client', async () => {
    const database = await getDB()
    const client = await database.getClient()
    const res1 = client.query('SELECT * FROM vn')
    const res2 = client.query('SELECT * FROM tags')
    const result = await Promise.all([res1, res2])
    await client.release()
    expect(database.totalCount()).toBeLessThan(3)
    expect(database.idleCount()).toBeLessThan(3)
    expect(database.waitingCount()).toBe(0)
    expect(result[0].rows.length).toBeGreaterThan(0)
    expect(result[1].rows.length).toBeGreaterThan(0)
  })

  test('Using a client (backup db)', async () => {
    await redis.set('database', 'backup')
    const database = await getDB()
    const client = await database.getClient()
    const res1 = client.query('SELECT * FROM vn')
    const res2 = client.query('SELECT * FROM tags')
    const result = await Promise.all([res1, res2])
    await client.release()
    expect(database.totalCount()).toBeLessThan(3)
    expect(database.idleCount()).toBeLessThan(3)
    expect(database.waitingCount()).toBe(0)
    expect(result[0].rows.length).toBeGreaterThan(0)
    expect(result[1].rows.length).toBeGreaterThan(0)
  })

  afterAll(async () => {
    await endDB()
    await killRedis()
  })
})
