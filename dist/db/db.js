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
const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = config_1.config;
const dbconfig = {
    user: PGUSER,
    host: PGHOST,
    password: PGPASSWORD,
    database: PGDATABASE,
    port: PGPORT,
};
const pool = new pg_1.Pool(dbconfig);
const database = {
    totalCount: () => {
        return pool.totalCount;
    },
    idleCount: () => {
        return pool.idleCount;
    },
    waitingCount: () => {
        return pool.waitingCount;
    },
    query: (text, params) => __awaiter(void 0, void 0, void 0, function* () {
        const start = Date.now();
        const res = yield pool.query(text, params);
        const end = Date.now();
        logger_1.logger.query(text, start, end);
        return res;
    }),
    getClient: () => __awaiter(void 0, void 0, void 0, function* () {
        const client = yield pool.connect();
        const query = client.query;
        // Not proud of this :(, but Typescript apparently doesn't have some kind of union of overloads
        client.query = (params) => __awaiter(void 0, void 0, void 0, function* () {
            client.lastQuery = params;
            const start = Date.now();
            logger_1.logger.info('Querying...');
            const res = yield query.apply(client, params);
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
    end: pool.end.bind(pool),
};
exports.database = database;
