"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Custom implementation for modified console printing and logging
var colors_1 = require("./colors");
function query(text, start, end) {
    console.log();
    colors_1.colorLog(colors_1.Color.FgYellow, "" + new Date(start).toString());
    colors_1.colorLog(colors_1.Color.FgYellow, "Query: " + text);
    colors_1.colorLog(colors_1.Color.FgYellow, "Time taken: " + (end - start) + " ms");
    console.log();
}
function error() {
    var text = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        text[_i] = arguments[_i];
    }
    colors_1.colorLog.apply(void 0, __spreadArrays([colors_1.Color.FgRed], text));
}
function log() {
    var text = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        text[_i] = arguments[_i];
    }
    colors_1.colorLog.apply(void 0, __spreadArrays([colors_1.Color.FgGreen], text));
}
function info() {
    var text = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        text[_i] = arguments[_i];
    }
    colors_1.colorLog.apply(void 0, __spreadArrays([colors_1.Color.FgCyan], text));
}
exports.Console = {
    query: query,
    error: error,
    log: log,
    info: info,
};
