"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware = {
    xPoweredByHeader: (req, res, next) => {
        res.header('X-powered-by', 'Blood, sweat and tears');
        next();
    },
};
exports.middleware = middleware;
