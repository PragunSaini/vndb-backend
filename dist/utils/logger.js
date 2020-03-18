"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Custom implementation for modified console printing and logging
const colors_1 = require("./colors");
const config_1 = require("./config");
/**
 * Logs a database query
 * @param text Query text
 * @param start Query initiation timestamp
 * @param end Query completed timestamp
 */
function query(text, start, end) {
    if (config_1.config.NODE_ENV == 'development') {
        console.log();
        colors_1.colorLog(colors_1.Color.FgYellow, `${new Date(start).toString()}`);
        colors_1.colorLog(colors_1.Color.FgYellow, `Query: ${text}`);
        colors_1.colorLog(colors_1.Color.FgYellow, `Time taken: ${end - start} ms`);
        console.log();
    }
}
/**
 * Logs error messages
 * @param text error to be logged
 */
function error(...text) {
    colors_1.colorLog(colors_1.Color.FgRed, ...text);
}
/**
 * Logs general messages
 * @param text message to be logged
 */
function log(...text) {
    colors_1.colorLog(colors_1.Color.FgGreen, ...text);
}
/**
 * Logs information
 * @param text information to be logged
 */
function info(...text) {
    colors_1.colorLog(colors_1.Color.FgCyan, ...text);
}
exports.logger = {
    query: query,
    error: error,
    log: log,
    info: info,
};
