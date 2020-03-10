import { NextFunction, Request, Response } from 'express';
declare const middleware: {
    xPoweredByHeader: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
};
export { middleware };
