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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
/* eslint-disable */
var pg_1 = require("pg");
var logger_1 = require("../utils/logger");
var config_1 = require("../utils/config");
var config = {
    user: config_1.PGUSER,
    host: config_1.PGHOST,
    password: config_1.PGPASSWORD,
    database: config_1.PGDATABASE,
    port: config_1.PGPORT,
};
var pool = new pg_1.Pool(config);
exports.DB = {
    totalCount: function () {
        return pool.totalCount;
    },
    idleCount: function () {
        return pool.idleCount;
    },
    waitingCount: function () {
        return pool.waitingCount;
    },
    query: function (text, params) { return __awaiter(void 0, void 0, void 0, function () {
        var start, res, end;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = Date.now();
                    return [4 /*yield*/, pool.query(text, params)];
                case 1:
                    res = _a.sent();
                    end = Date.now();
                    logger_1.Console.query(text, start, end);
                    return [2 /*return*/, res];
            }
        });
    }); },
    getClient: function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, query, timeout, release;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    query = client.query;
                    client.query = function (text, params) { return __awaiter(void 0, void 0, void 0, function () {
                        var start, res, end;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    client.lastQuery = text;
                                    start = Date.now();
                                    logger_1.Console.info('Querying...');
                                    return [4 /*yield*/, query.apply(client, [text, params])];
                                case 1:
                                    res = _a.sent();
                                    end = Date.now();
                                    logger_1.Console.query(text, start, end);
                                    return [2 /*return*/, res];
                            }
                        });
                    }); };
                    timeout = setTimeout(function () {
                        logger_1.Console.error('A client has been checked out for more than 5 seconds!');
                        logger_1.Console.error("The last executed query on this client was: " + client.lastQuery);
                    }, 5000);
                    release = client.release;
                    client.release = function (err) {
                        clearTimeout(timeout);
                        client.query = query;
                        client.release = release;
                        client.release(err);
                    };
                    return [2 /*return*/, client];
            }
        });
    }); },
    end: pool.end.bind(pool),
};
