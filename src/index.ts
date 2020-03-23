// Libraries
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

// Import connections
import { connectDB } from './db/db'
import { startRedis } from './utils/redis'

// Imports utils
import { middleware } from './utils/middleware'
import { config } from './utils/config'

// Import routes
import { vnRouter } from './routes/vn'

// Create the app
const app = express()

// Deploy Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(middleware.xPoweredByHeader)
app.use(middleware.requestLogger)

// Declare routes
app.use('/vn', vnRouter)

// Error Handling Middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// Connect to the database and redis
connectDB()
startRedis()

// Start the server
app.listen(config.PORT, () => {
  console.info(`Listening on PORT ${config.PORT} ...\n`)
})
