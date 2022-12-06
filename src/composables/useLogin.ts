import { HttpAxios } from "@/api/http-axios";
import type { User } from "@/interfaces/user.interface";
import { ref, unref, type Ref } from "vue";
import { inject } from "vue";
import type { LoginResponse } from "../interfaces/responses/login-response.interface";
import type { LoginErrorResponse } from "../interfaces/responses/login-error-response.interface";

export function useLogin(userRef: Ref<User>, isLoading: Ref<boolean>) {
    const apiUrl = inject("apiUrl") + "auth/login";
    const http = new HttpAxios();
    const user = unref(userRef);

    let logIn = async () => {
        isLoading.value = true;
        const response = http
            .post<LoginResponse, LoginErrorResponse>(apiUrl, user)
            .then((data) => {
                console.log(data);
            })
            .catch((errorData) => {
                console.log(errorData);
            });

        isLoading.value = false;
    };

    return {
        logIn,
    };
}
