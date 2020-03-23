import { Pool, QueryResult, PoolClient, PoolConfig, Submittable } from 'pg'
import { logger } from '../utils/logger'
import { config } from '../utils/config'
import { redis } from '../utils/redis'

// Get the database conenction settings
const { PGHOST, PGUSER, PGDATABASE, PGBACKUPDATABASE, PGPASSWORD, PGPORT } = config

// Database connection object
const dbconfig: PoolConfig = {
  user: PGUSER as string,
  host: PGHOST as string,
  password: PGPASSWORD as string,
  database: PGDATABASE as string,
  port: PGPORT as number,
}

// Database connection object (for backup database)
const dbbackupconfig: PoolConfig = {
  user: PGUSER as string,
  host: PGHOST as string,
  password: PGPASSWORD as string,
  database: PGBACKUPDATABASE as string,
  port: PGPORT as number,
}

export interface Database {
  totalCount: () => number
  idleCount: () => number
  waitingCount: () => number
  query: (text: string, params: any[]) => Promise<QueryResult<any>>
  getClient: () => Promise<PoolClient>
}

/**
 * Returns a database object with helpers to interact with the pool
 * @param pool A database connection pool
 */
function createDB(pool: Pool): Database {
  return {
    /**
     * Returns total number of clients in the pool
     */
    totalCount: (): number => {
      return pool.totalCount
    },
    /**
     * Returns number of clients not checked out
     */
    idleCount: (): number => {
      return pool.idleCount
    },
    /**
     * Returns number of queued requests
     */
    waitingCount: (): number => {
      return pool.waitingCount
    },
    /**
     * Run a query on the database
     */
    query: async (text: string, params: any[]): Promise<QueryResult<any>> => {
      const start = Date.now()
      const res = await pool.query(text, params)
      const end = Date.now()
      logger.query(text, start, end)
      return res
    },
    /**
     * Get a client from the pool, which can be used to run queries
     */
    getClient: async (): Promise<PoolClient> => {
      const client: PoolClient & { lastQuery?: any[] } = await pool.connect()
      const query = client.query

      type paramsType = Parameters<typeof query>
      type resultType = QueryResult<any>

      // Not proud of this :(, but Typescript apparently doesn't have some kind of union of overloads
      client.query = async <T extends Submittable>(params: T | paramsType): Promise<resultType> => {
        client.lastQuery = (params as unknown) as paramsType
        const start = Date.now()
        const res: resultType = ((await query.apply(client, ([
          params,
        ] as unknown) as paramsType)) as unknown) as resultType
        const end = Date.now()
        logger.query(((params as unknown) as paramsType)[0], start, end)
        return (res as unknown) as resultType
      }

      // For use in development
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
  }
}

// A pool of database conenctions
let pool: Pool
let poolDatabase: Database
let backupPool: Pool
let backupPoolDatabase: Database
let current: string

/**
 * Connect to the database
 */
function connectDB(): void {
  pool = new Pool(dbconfig)
  backupPool = new Pool(dbbackupconfig)
  poolDatabase = createDB(pool)
  backupPoolDatabase = createDB(backupPool)
  current = 'main'
}

/**
 * End the database connection and destroy the pool
 */
function endDB(): Promise<[void, void]> {
  return Promise.all([pool.end(), backupPool.end()])
}

/**
 * Get a database object, for querying the database
 */
async function getDB(): Promise<Database> {
  if (redis == undefined) {
    return new Promise((resolve, reject) => resolve(poolDatabase))
  }
  const curr = await redis.get('database')
  current = curr == null ? 'main' : curr
  return current == 'main' ? poolDatabase : backupPoolDatabase
}

export { connectDB, getDB, endDB }
