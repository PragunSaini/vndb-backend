// Libraries
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

// Imports
import { middleware } from './utils/middleware'
import { config } from './utils/config'
import { logger } from './utils/logger'
import { database } from './db/db'

// Create the app
const app = express()

// Deploy Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(middleware.xPoweredByHeader)
app.use(middleware.requestLogger)

// Declare routes
app.get('/', async (req, res) => {
  try {
    const result = await database.query('SELECT * FROM vn WHERE id = $1', [100])
    res.json(result)
  } catch (err) {
    logger.error(err)
  }
})

// Error Handling Middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// Start the server
app.listen(config.PORT, () => {
  logger.info(`Listening on PORT ${config.PORT} ...\n`)
})
