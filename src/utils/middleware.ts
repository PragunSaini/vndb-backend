import { NextFunction, Request, Response } from 'express'
import { logger } from './logger'
import { DatabaseError } from './errors'

const middleware = {
  /**
   * Logs the requests made to the server, for use during debugging/development
   */
  requestLogger: (req: Request, res: Response, next: NextFunction): void => {
    logger.info('Request at: ', Date())
    logger.info('Method: ', req.method)
    logger.info('Path: ', req.path)
    logger.info('Body: ', JSON.stringify(req.body))
    logger.info('---------------------')
    next()
  },

  /**
   * Changes the x-powered-by header in server responses   O.o
   */
  xPoweredByHeader: (req: Request, res: Response, next: NextFunction): void => {
    res.header('X-powered-by', 'Tannhäuser Gate')
    next()
  },

  /**
   * Handles requests made to server at uknown endpoints
   */
  unknownEndpoint: (req: Request, res: Response): void => {
    res.status(404).send({ message: 'Unknown Endpoint' })
  },

  /**
   * Handles any errors during processing a request. Add custom error handling here
   */
  errorHandler: (error: Error, req: Request, res: Response, next: NextFunction): void => {
    logger.error(error.message)

    if (error instanceof DatabaseError) {
      if (error.code == 'VNNOTFOUND') {
        res.status(404).json({ code: error.code, message: error.message })
      }
    } else {
      res.status(500).send({ message: 'Internal Error occured' })
    }

    next(error)
  },
}

export { middleware }
