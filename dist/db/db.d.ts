import { QueryResult, PoolClient } from 'pg';
export declare const DB: {
    totalCount: () => number;
    idleCount: () => number;
    waitingCount: () => number;
    query: (text: string, params: any[]) => Promise<QueryResult<any>>;
    getClient: () => Promise<PoolClient>;
    end: {
        (): Promise<void>;
        (callback: () => void): void;
    };
};
