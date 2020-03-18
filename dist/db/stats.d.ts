interface DBStats {
    vn: number;
    tags: number;
    releases: number;
    producers: number;
    staff: number;
    characters: number;
    traits: number;
}
/**
 * Get the statistics related to the VNDB database
 */
declare const dbstats: () => Promise<DBStats>;
export { dbstats };
