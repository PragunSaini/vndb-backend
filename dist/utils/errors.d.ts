declare class DatabaseError extends Error {
    code?: string;
    constructor(code?: string, message?: string);
}
export { DatabaseError };
