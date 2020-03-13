"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const errors_1 = require("./errors");
const middleware = {
    requestLogger: (req, res, next) => {
        logger_1.logger.info('Request at: ', Date());
        logger_1.logger.info('Method: ', req.method);
        logger_1.logger.info('Path: ', req.path);
        logger_1.logger.info('Body: ', JSON.stringify(req.body));
        logger_1.logger.info('---------------------');
        next();
    },
    xPoweredByHeader: (req, res, next) => {
        res.header('X-powered-by', 'Tannhäuser Gate');
        next();
    },
    unknownEndpoint: (req, res) => {
        res.status(404).send({ message: 'Unknown Endpoint' });
    },
    errorHandler: (error, req, res, next) => {
        logger_1.logger.error(error.message);
        if (error instanceof errors_1.DatabaseError) {
            if (error.code == 'VNNOTFOUND') {
                res.status(404).json({ code: error.code, message: error.message });
            }
        }
        else {
            res.status(500).send({ message: 'Internal Error occured' });
        }
        next(error);
    },
};
exports.middleware = middleware;
