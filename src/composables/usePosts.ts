import type { Post } from "@/interfaces/post.interface";
import type { ErrorResponse } from "@/interfaces/responses/error-response.interface";
import { inject, type Ref, unref } from "vue";
import { HttpAxios } from "../api/http-axios";
export function usePosts() {
    const apiUrl = inject("apiUrl") + "posts";
    const http = new HttpAxios();

    const getPosts = (
        isLoading: Ref<boolean>,
        offset: number = 0,
        termSearch?: Ref<string>,
        limit: number = 5
    ) => {
        let term = termSearch != undefined ? unref(termSearch) : "";
        return new Promise<any>((resolve, reject) => {
            isLoading.value = true;
            http.get(apiUrl, {
                offset,
                term,
                limit,
            })
                .then((data: Post[]) => {
                    resolve(data);
                })
                .catch((errorData: ErrorResponse) => {
                    reject(errorData);
                });
            isLoading.value = false;
        });
    };

    return {
        getPosts,
    };
}
