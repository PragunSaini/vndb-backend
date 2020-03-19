import Redis from 'ioredis'

let redis: Redis.Redis

/**
 * Connect to redis
 */
function startRedis(): void {
  redis = new Redis()
}

/**
 * Disconnect redis
 */
function killRedis(): Promise<string> {
  return redis.quit()
}

export { startRedis, redis, killRedis }
