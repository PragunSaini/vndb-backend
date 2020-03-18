interface VNResult {
    vn?: any;
    wikidata?: any;
    staff?: any[];
    relations?: any[];
    anime?: any[];
    producers?: any[];
    developers?: any[];
    releases?: any[];
    screenshots?: any[];
    tags?: any[];
    chars?: any[];
}
declare const getvn: (id: number) => Promise<VNResult>;
export { getvn };
