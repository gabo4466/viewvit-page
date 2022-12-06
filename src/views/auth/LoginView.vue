<script setup lang="ts">
import { ref, warn, type Ref } from "vue";
import Swal from "sweetalert2";
import Message from "primevue/message";

import type { User } from "@/interfaces/user.interface";
import { useLogin } from "../../composables/useLogin";
import type { LoginResponse } from "../../interfaces/responses/login-response.interface";
import type { LoginErrorResponse } from "../../interfaces/responses/login-error-response.interface";
import router from "../../router/index";

const isLoading: Ref<boolean> = ref(false);
const user: Ref<User> = ref({
    email: "",
    password: "",
});
const errors: Ref<string[]> = ref([]);
const { logIn } = useLogin(user);

function signIn(event: Event) {
    logIn(isLoading)
        .then((data: LoginResponse) => {
            errors.value = [];
            router.push({ name: "home" });
        })
        .catch((error: LoginErrorResponse) => {
            console.log(error.message);
            if (Array.isArray(error.message)) {
                errors.value = error.message;
            } else {
                errors.value.push(error.message);
            }
        });
}
</script>

<template>
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
            <img
                src="../../assets/images/viewvitLogo.png"
                alt="Image"
                height="200"
                class="mb-3"
            />
            <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
            <span class="text-600 font-medium line-height-3"
                >Don't have an account?</span
            >
            <a
                class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                >Create today!</a
            >
        </div>

        <div>
            <label for="email" class="block text-900 font-medium mb-2"
                >Email</label
            >
            <InputText
                v-model.trim="user.email"
                id="email"
                type="text"
                class="w-full mb-3"
            />

            <label for="password" class="block text-900 font-medium mb-2"
                >Password</label
            >
            <InputText
                v-model="user.password"
                id="password"
                type="password"
                class="w-full mb-3"
            />

            <div class="flex align-items-center justify-content-between mb-5">
                <a
                    class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                    >Forgot password?</a
                >
            </div>

            <transition-group name="p-message" tag="div">
                <Message
                    v-for="(msg, idx) in errors"
                    severity="error"
                    :key="idx"
                    :closable="false"
                >
                    <span class="text-sm">{{ msg }}</span>
                </Message>
            </transition-group>

            <Button
                @click="signIn"
                label="Sign In"
                icon="pi pi-user"
                class="w-full"
            ></Button>
        </div>

        <div class="wrapper w-full">
            <ProgressSpinner v-show="isLoading" />
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    padding: 10px 0 0 0;
}
</style>
