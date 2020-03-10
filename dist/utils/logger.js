"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Custom implementation for modified console printing and logging
const colors_1 = require("./colors");
function query(text, start, end) {
    console.log();
    colors_1.colorLog(colors_1.Color.FgYellow, `${new Date(start).toString()}`);
    colors_1.colorLog(colors_1.Color.FgYellow, `Query: ${text}`);
    colors_1.colorLog(colors_1.Color.FgYellow, `Time taken: ${end - start} ms`);
    console.log();
}
function error(...text) {
    colors_1.colorLog(colors_1.Color.FgRed, ...text);
}
function log(...text) {
    colors_1.colorLog(colors_1.Color.FgGreen, ...text);
}
function info(...text) {
    colors_1.colorLog(colors_1.Color.FgCyan, ...text);
}
exports.Console = {
    query: query,
    error: error,
    log: log,
    info: info,
};
