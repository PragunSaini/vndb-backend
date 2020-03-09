// Load the environment variables
require('dotenv').config()

// Retrieve the env variables
const { PORT, NODE_ENV, PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPRT } = process.env
const PGPORT = parseInt(PGPRT as string, 10)

// Export them for use
export { PORT, NODE_ENV, PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT }
