import { HttpAxios } from "@/api/http-axios";
import type { User } from "@/interfaces/user.interface";
import { ref, unref, type Ref } from "vue";
import { inject } from "vue";
import type { LoginResponse } from "../interfaces/responses/login-response.interface";
import type { LoginErrorResponse } from "../interfaces/responses/login-error-response.interface";

export function useLogin(userRef: Ref<User>) {
    const apiUrl = inject("apiUrl") + "auth/login";
    const http = new HttpAxios();
    const user = unref(userRef);

    let logIn = async (isLoading: Ref<boolean>) => {
        return new Promise<any>((resolve, reject) => {
            isLoading.value = true;
            const response = http
                .post(apiUrl, user)
                .then((data: LoginResponse) => {
                    localStorage.setItem("access", data.token);
                    resolve(data);
                })
                .catch((errorData: LoginErrorResponse) => {
                    reject(errorData);
                });

            isLoading.value = false;
        });
    };

    return {
        logIn,
    };
}
