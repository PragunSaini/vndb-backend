import { dbstats } from '../../src/db/stats'
import { database } from '../../src/db/db'

describe('DBstats', () => {
  beforeAll(() => {
    database.connect()
  })
  test('Get the stats', async () => {
    const stats = await dbstats()
    expect(stats).toBeDefined()
  })
  afterAll(async () => {
    await database.end()
  })
})
