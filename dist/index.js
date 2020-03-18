"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libraries
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
// Import database stuff
const db_1 = require("./db/db");
// Imports utils
const middleware_1 = require("./utils/middleware");
const config_1 = require("./utils/config");
const logger_1 = require("./utils/logger");
// Import routes
const vn_1 = require("./routes/vn");
// Create the app
const app = express_1.default();
// Deploy Middleware
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(middleware_1.middleware.xPoweredByHeader);
app.use(middleware_1.middleware.requestLogger);
// Declare routes
app.use('/vn', vn_1.vnRouter);
// Error Handling Middleware
app.use(middleware_1.middleware.unknownEndpoint);
app.use(middleware_1.middleware.errorHandler);
// Connect to the database and Start the server
db_1.connectDB();
app.listen(config_1.config.PORT, () => {
    logger_1.logger.info(`Listening on PORT ${config_1.config.PORT} ...\n`);
});
