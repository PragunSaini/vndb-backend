import { QueryResult, PoolClient } from 'pg';
/**
 * Connect to the database
 */
declare function connectDB(): void;
/**
 * End the database connection and destroy the pool
 */
declare function endDB(): Promise<void>;
/**
 * A database object, for querying the database
 */
declare const database: {
    /**
     * Returns total number of clients in the pool
     */
    totalCount: () => number;
    /**
     * Returns number of clients not checked out
     */
    idleCount: () => number;
    /**
     * Returns number of queued requests
     */
    waitingCount: () => number;
    /**
     * Run a query on the database
     */
    query: (text: string, params: any[]) => Promise<QueryResult<any>>;
    /**
     * Get a client from the pool, which can be used to run queries
     */
    getClient: () => Promise<PoolClient>;
};
export { connectDB, database, endDB };
