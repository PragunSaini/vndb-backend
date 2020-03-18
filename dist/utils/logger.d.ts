/**
 * Logs a database query
 * @param text Query text
 * @param start Query initiation timestamp
 * @param end Query completed timestamp
 */
declare function query(text: string, start: number, end: number): void;
/**
 * Logs error messages
 * @param text error to be logged
 */
declare function error(...text: any[]): void;
/**
 * Logs general messages
 * @param text message to be logged
 */
declare function log(...text: any[]): void;
/**
 * Logs information
 * @param text information to be logged
 */
declare function info(...text: any[]): void;
export declare const logger: {
    query: typeof query;
    error: typeof error;
    log: typeof log;
    info: typeof info;
};
export {};
