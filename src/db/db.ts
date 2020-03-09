// @ts-nocheck
/* eslint-disable */
import { Pool, ClientConfig, QueryResult, PoolClient } from 'pg'
import { Console } from '../utils/logger'
import { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } from '../utils/config'

const config: ClientConfig = {
  user: PGUSER,
  host: PGHOST,
  password: PGPASSWORD,
  database: PGDATABASE,
  port: PGPORT,
}

const pool = new Pool(config)

export const DB = {
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
    Console.query(text, start, end)
    return res
  },
  getClient: async (): Promise<PoolClient> => {
    const client = await pool.connect()
    const query = client.query

    client.query = async (text: string, params: any[]): Promise<QueryResult<any>> => {
      client.lastQuery = text
      const start = Date.now()
      Console.info('Querying...')
      const res = await query.apply(client, [text, params])
      const end = Date.now()
      Console.query(text, start, end)
      return res
    }

    const timeout = setTimeout(() => {
      Console.error('A client has been checked out for more than 5 seconds!')
      Console.error(`The last executed query on this client was: ${client.lastQuery}`)
    }, 5000)

    const release = client.release
    client.release = err => {
      clearTimeout(timeout)
      client.query = query
      client.release = release
      client.release(err)
    }

    return client
  },
  end: pool.end.bind(pool),
}
