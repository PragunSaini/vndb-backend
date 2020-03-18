"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Custom Error class to identify and distinguish errors raised by the database
 */
class DatabaseError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
exports.DatabaseError = DatabaseError;
