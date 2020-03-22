import Redis from 'ioredis'
import { config } from './config'

let redis: Redis.Redis

/**
 * Connect to redis
 */
function startRedis(): void {
  redis = new Redis(config.REDISPORT as number)
}

/**
 * Disconnect redis
 */
function killRedis(): Promise<string> {
  return redis.quit()
}

export { startRedis, redis, killRedis }
