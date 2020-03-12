import { NextFunction, Request, Response } from 'express';
declare const middleware: {
    requestLogger: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
    xPoweredByHeader: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
    unknownEndpoint: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) => void;
    errorHandler: (error: Error, req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
};
export { middleware };
