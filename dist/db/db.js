"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const logger_1 = require("../utils/logger");
const config_1 = require("../utils/config");
// Get the database conenction settings
const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = config_1.config;
// Database connection object
const dbconfig = {
    user: PGUSER,
    host: PGHOST,
    password: PGPASSWORD,
    database: PGDATABASE,
    port: PGPORT,
};
// A pool of database conenctions
let pool;
/**
 * Connect to the database
 */
function connectDB() {
    pool = new pg_1.Pool(dbconfig);
}
exports.connectDB = connectDB;
/**
 * End the database connection and destroy the pool
 */
function endDB() {
    return pool.end();
}
exports.endDB = endDB;
/**
 * A database object, for querying the database
 */
const database = {
    /**
     * Returns total number of clients in the pool
     */
    totalCount: () => {
        return pool.totalCount;
    },
    /**
     * Returns number of clients not checked out
     */
    idleCount: () => {
        return pool.idleCount;
    },
    /**
     * Returns number of queued requests
     */
    waitingCount: () => {
        return pool.waitingCount;
    },
    /**
     * Run a query on the database
     */
    query: (text, params) => __awaiter(void 0, void 0, void 0, function* () {
        const start = Date.now();
        const res = yield pool.query(text, params);
        const end = Date.now();
        logger_1.logger.query(text, start, end);
        return res;
    }),
    /**
     * Get a client from the pool, which can be used to run queries
     */
    getClient: () => __awaiter(void 0, void 0, void 0, function* () {
        const client = yield pool.connect();
        const query = client.query;
        // Not proud of this :(, but Typescript apparently doesn't have some kind of union of overloads
        client.query = (params) => __awaiter(void 0, void 0, void 0, function* () {
            client.lastQuery = params;
            const start = Date.now();
            const res = (yield query.apply(client, [
                params,
            ]));
            const end = Date.now();
            logger_1.logger.query(params[0], start, end);
            return res;
        });
        const timeout = setTimeout(() => {
            logger_1.logger.error('A client has been checked out for more than 5 seconds!');
            logger_1.logger.error(`The last executed query on this client was: ${client.lastQuery}`);
        }, 5000);
        const release = client.release;
        client.release = (err) => {
            clearTimeout(timeout);
            client.query = query;
            client.release = release;
            client.release(err);
        };
        return client;
    }),
};
exports.database = database;
