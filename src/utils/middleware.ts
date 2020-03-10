import { NextFunction, Request, Response } from 'express'

const middleware = {
  xPoweredByHeader: (req: Request, res: Response, next: NextFunction): void => {
    res.header('X-powered-by', 'Blood, sweat and tears')
    next()
  },
}

export { middleware }
