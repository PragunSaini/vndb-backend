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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libraries
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
// Imports
const middleware_1 = require("./utils/middleware");
const config_1 = require("./utils/config");
const logger_1 = require("./utils/logger");
const db_1 = require("./db/db");
// Create the app
const app = express_1.default();
// Deploy Middleware
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(middleware_1.middleware.xPoweredByHeader);
app.use(middleware_1.middleware.requestLogger);
// Declare routes
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.database.query('SELECT * FROM vn WHERE id = $1', [100]);
        res.json(result);
    }
    catch (err) {
        logger_1.logger.error(err);
    }
}));
// Error Handling Middleware
app.use(middleware_1.middleware.unknownEndpoint);
app.use(middleware_1.middleware.errorHandler);
// Start the server
app.listen(config_1.config.PORT, () => {
    logger_1.logger.info(`Listening on PORT ${config_1.config.PORT} ...\n`);
});
