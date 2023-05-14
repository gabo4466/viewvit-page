import { HttpAxios } from "@/api/http-axios";
import { inject, unref, type Ref } from "vue";
import type { GetAccountDataResponse } from "../interfaces/responses/get-account-data-response.interface";
import type { User } from "@/interfaces/user.interface";
import type { LoginResponse } from "@/interfaces/responses/login-response.interface";
import type { ErrorResponse } from "@/interfaces/responses/error-response.interface";
import type { CreateUserResponse } from "../interfaces/responses/create-user-response.interface";

export function useAuth() {
    const apiUrl = inject("apiUrl") + "auth";
    const http = new HttpAxios();

    const getAccountData = () => {
        return new Promise((resolve, reject) => {
            http.get(apiUrl, {})
                .then((data: GetAccountDataResponse) => {
                    resolve(data);
                })
                .catch((error: ErrorResponse) => {
                    reject(error);
                });
        });
    };

    const logIn = async (isLoading: Ref<boolean>, userRef: Ref<User>) => {
        const user = unref(userRef);
        return new Promise<any>((resolve, reject) => {
            isLoading.value = true;
            const response = http
                .post(apiUrl + "/login", user)
                .then((data: LoginResponse) => {
                    localStorage.setItem("access", data.token);
                    resolve(data);
                })
                .catch((errorData: ErrorResponse) => {
                    reject(errorData);
                });

            isLoading.value = false;
        });
    };

    const createUser = async (isLoading: Ref<boolean>, userRef: Ref<User>) => {
        const user = unref(userRef);
        return new Promise<any>((resolve, reject) => {
            isLoading.value = true;
            const response = http
                .post(apiUrl, user)
                .then((data: CreateUserResponse) => {
                    localStorage.setItem("access", data.token);
                    resolve(data);
                })
                .catch((errorData: ErrorResponse) => {
                    reject(errorData);
                });
            isLoading.value = false;
        });
    };

    return {
        getAccountData,
        logIn,
        createUser,
    };
}
