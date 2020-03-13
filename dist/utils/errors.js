"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DatabaseError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
exports.DatabaseError = DatabaseError;
