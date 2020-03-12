declare function query(text: string, start: number, end: number): void;
declare function error(...text: any[]): void;
declare function log(...text: any[]): void;
declare function info(...text: any[]): void;
export declare const logger: {
    query: typeof query;
    error: typeof error;
    log: typeof log;
    info: typeof info;
};
export {};
