import { dbstats } from '../../src/db/stats'
import { connectDB, endDB } from '../../src/db/db'

describe('DBstats', () => {
  beforeAll(async () => {
    connectDB()
  })

  test('Get the stats', async () => {
    const stats = await dbstats()
    expect(stats).toBeDefined()
  })

  afterAll(async () => {
    await endDB()
  })
})
