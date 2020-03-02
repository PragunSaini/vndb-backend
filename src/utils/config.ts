// Load the environment variables
require('dotenv').config()

// Retrieve the env variables
const { PORT, NODE_ENV } = process.env

// Export them for use
export { PORT, NODE_ENV }
