/**
 * Custom Error class to identify and distinguish errors raised by the database
 */
declare class DatabaseError extends Error {
    code?: string;
    constructor(code?: string, message?: string);
}
export { DatabaseError };
