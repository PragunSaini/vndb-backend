interface VNResult {
    vn?: any;
    wikidata?: any;
    staff?: any;
    relations?: any;
    anime?: any;
    producers?: any;
    developers?: any;
}
declare const getvn: (id: number) => Promise<VNResult>;
export { getvn };
