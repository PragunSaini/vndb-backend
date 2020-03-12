import { NextFunction, Request, Response } from 'express'
import { logger } from './logger'

const middleware = {
  requestLogger: (req: Request, res: Response, next: NextFunction): void => {
    logger.info('Request at: ', Date())
    logger.info('Method: ', req.method)
    logger.info('Path: ', req.path)
    logger.info('Body: ', req.body)
    logger.info('---------------------')
    next()
  },

  xPoweredByHeader: (req: Request, res: Response, next: NextFunction): void => {
    res.header('X-powered-by', '')
    next()
  },

  unknownEndpoint: (req: Request, res: Response): void => {
    res.status(404).send({ message: 'Unknown Endpoint' })
  },

  errorHandler: (error: Error, req: Request, res: Response, next: NextFunction): void => {
    logger.error(error.message)

    res.status(500).send({ message: 'Error occured' })

    next(error)
  },
}

export { middleware }
