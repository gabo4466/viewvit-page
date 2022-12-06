export interface Http {
    get<T>(url: string, queryParams: object): Promise<T>;
    post<T, E>(url: string, body: object, queryParams?: object): Promise<T | E>;
    patch<T>(url: string, body: object, queryParams: object): Promise<T>;
    delete<T>(url: string, queryParams: object): Promise<T>;
}
