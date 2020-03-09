"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Load the environment variables
require('dotenv').config();
// Retrieve the env variables
var _a = process.env, PORT = _a.PORT, NODE_ENV = _a.NODE_ENV, PGHOST = _a.PGHOST, PGUSER = _a.PGUSER, PGDATABASE = _a.PGDATABASE, PGPASSWORD = _a.PGPASSWORD, PGPRT = _a.PGPRT;
exports.PORT = PORT;
exports.NODE_ENV = NODE_ENV;
exports.PGHOST = PGHOST;
exports.PGUSER = PGUSER;
exports.PGDATABASE = PGDATABASE;
exports.PGPASSWORD = PGPASSWORD;
var PGPORT = parseInt(PGPRT, 10);
exports.PGPORT = PGPORT;
