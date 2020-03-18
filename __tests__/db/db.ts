import { database } from '../../src/db/db'

describe('Database interface', () => {
  test('Single Query', async () => {
    expect(database.totalCount()).toBe(0)
    const res = await database.query('SELECT * FROM vn', [])
    expect(database.totalCount()).toBe(1)
    expect(res.rows.length).toBeGreaterThan(0)
  })

  afterAll(async () => {
    await database.end()
  })
})
