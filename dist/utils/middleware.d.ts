import { NextFunction, Request, Response } from 'express';
declare const middleware: {
    /**
     * Logs the requests made to the server, for use during debugging/development
     */
    requestLogger: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
    /**
     * Changes the x-powered-by header in server responses   O.o
     */
    xPoweredByHeader: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
    /**
     * Handles requests made to server at uknown endpoints
     */
    unknownEndpoint: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) => void;
    /**
     * Handles any errors during processing a request. Add custom error handling here
     */
    errorHandler: (error: Error, req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
};
export { middleware };
