import { QueryResult, PoolClient } from 'pg';
declare const database: {
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
export { database };
