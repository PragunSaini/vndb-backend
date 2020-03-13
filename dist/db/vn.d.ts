interface VNResult {
    vn?: any;
    wikidata?: any;
    staff?: any;
}
declare const getvn: (id: number) => Promise<VNResult>;
export { getvn };
