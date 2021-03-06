// Load the environment variables
require('dotenv').config()

interface EnvConfig {
  PORT: string | number | undefined
  NODE_ENV: string | number | undefined
  PGHOST: string | number | undefined
  PGUSER: string | number | undefined
  PGDATABASE: string | number | undefined
  PGBACKUPDATABASE: string | number | undefined
  PGPASSWORD: string | number | undefined
  PGPORT: string | number | undefined
  REDISPORT: string | number | undefined
  REDISHOST: string | number | undefined
}

// Retrieve the env variables
const config: EnvConfig = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  PGHOST: process.env.PGHOST,
  PGUSER: process.env.PGUSER,
  PGDATABASE: process.env.PGDATABASE,
  PGBACKUPDATABASE: process.env.PGBACKUPDATABASE,
  PGPASSWORD: process.env.PGPASSWORD,
  PGPORT: process.env.PGPORT,
  REDISPORT: process.env.REDISPORT,
  REDISHOST: process.env.REDISHOST,
}

// Export them for use
export { config }
