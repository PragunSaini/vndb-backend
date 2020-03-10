interface EnvConfig {
    PORT: string | number | undefined;
    NODE_ENV: string | number | undefined;
    PGHOST: string | number | undefined;
    PGUSER: string | number | undefined;
    PGDATABASE: string | number | undefined;
    PGPASSWORD: string | number | undefined;
    PGPORT: string | number | undefined;
}
declare const config: EnvConfig;
export { config };
