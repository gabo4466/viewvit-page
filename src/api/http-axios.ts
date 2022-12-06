import type { Http } from "@/interfaces/http.interface";
import axios, { AxiosError, type AxiosResponse } from "axios";

export class HttpAxios implements Http {
    private readonly axios = axios;

    async get<T>(url: string, queryParams: object): Promise<T> {
        const { data } = await this.axios.get<T>(url, {
            params: queryParams,
        });
        return data;
    }
    async post<T, E>(
        url: string,
        body: object,
        queryParams?: object
    ): Promise<T | E> {
        return new Promise<T | E>((resolve, reject) => {
            return this.axios
                .post<T>(url, body, {
                    params: queryParams,
                })
                .then((axiosData) => {
                    resolve(axiosData.data);
                })
                .catch((axiosError) => {
                    reject(axiosError.response?.data);
                });
        });
    }
    async patch<T>(url: string, body: object, queryParams: object): Promise<T> {
        const { data } = await this.axios.patch<T>(url, body, {
            params: queryParams,
        });
        return data;
    }
    async delete<T>(url: string, queryParams: object): Promise<T> {
        const { data } = await this.axios.delete<T>(url);
        return data;
    }
}
