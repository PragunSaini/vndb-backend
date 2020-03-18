import { Pool, QueryResult, PoolClient, PoolConfig, Submittable } from 'pg'
import { logger } from '../utils/logger'
import { config } from '../utils/config'

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = config

const dbconfig: PoolConfig = {
  user: PGUSER as string,
  host: PGHOST as string,
  password: PGPASSWORD as string,
  database: PGDATABASE as string,
  port: PGPORT as number,
}

const pool = new Pool(dbconfig)

const database = {
  totalCount: (): number => {
    return pool.totalCount
  },
  idleCount: (): number => {
    return pool.idleCount
  },
  waitingCount: (): number => {
    return pool.waitingCount
  },
  query: async (text: string, params: any[]): Promise<QueryResult<any>> => {
    const start = Date.now()
    const res = await pool.query(text, params)
    const end = Date.now()
    logger.query(text, start, end)
    return res
  },
  getClient: async (): Promise<PoolClient> => {
    const client: PoolClient & { lastQuery?: any[] } = await pool.connect()
    const query = client.query

    type paramsType = Parameters<typeof query>
    type resultType = QueryResult<any>

    // Not proud of this :(, but Typescript apparently doesn't have some kind of union of overloads
    client.query = async <T extends Submittable>(params: T | paramsType): Promise<resultType> => {
      client.lastQuery = (params as unknown) as paramsType
      const start = Date.now()
      logger.info('Querying...')
      const res: resultType | void = await query.apply(client, (params as unknown) as paramsType)
      const end = Date.now()
      logger.query(((params as unknown) as paramsType)[0], start, end)
      return (res as unknown) as resultType
    }

    const timeout = setTimeout(() => {
      logger.error('A client has been checked out for more than 5 seconds!')
      logger.error(`The last executed query on this client was: ${client.lastQuery}`)
    }, 5000)

    const release = client.release
    client.release = (err): void => {
      clearTimeout(timeout)
      client.query = query
      client.release = release
      client.release(err)
    }

    return client
  },
  end: pool.end.bind(pool) as () => Promise<void>,
}

export { database }
