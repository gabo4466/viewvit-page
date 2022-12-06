export interface Http {
    get(url: string, queryParams: object): Promise<any>;
    post(url: string, body: object, queryParams?: object): Promise<any>;
    patch(url: string, body: object, queryParams: object): Promise<any>;
    delete(url: string, queryParams: object): Promise<any>;
}
