<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import type { User } from "@/interfaces/user.interface";
import { computed } from "@vue/reactivity";
import type { Ref } from "vue";
import { ref, unref } from "vue";

import Message from "primevue/message";
import type { ErrorResponse } from "@/interfaces/responses/error-response.interface";
import Swal from "sweetalert2";
import type { CreateUserResponse } from "../../interfaces/responses/create-user-response.interface";
import { useRouter } from "vue-router";

const user: Ref<User> = ref({
    email: "",
    password: "",
    nickname: "",
    birthday: new Date(),
});
const repeatPassword: Ref<string> = ref("");
const errors: Ref<string[]> = ref([]);
const isLoading: Ref<boolean> = ref(false);

const router = useRouter();

const validForm = computed<boolean>(() => {
    let valid = true;
    // TODO: Validations!!

    if (user.value.email !== undefined && user.value.email?.length < 4) {
        valid = false;
        errors.value.push("Invalid email");
    }

    if (user.value.password !== undefined && user.value.password.length < 5) {
        valid = false;
        errors.value.push("The password must have at least 5 characters");
    }

    if (repeatPassword.value != user.value.password) {
        valid = false;
        errors.value.push("Repeat password must match Password");
    }

    return valid;
});

const { createUser } = useAuth();

function signUp() {
    if (validForm.value) {
        createUser(isLoading, user)
            .then((data: CreateUserResponse) => {
                Swal.fire({
                    title: `Register succesfully!`,
                    text: `You will be redirected to home`,
                }).then(() => {
                    router.push({ path: "/home" });
                });
            })
            .catch((error: ErrorResponse) => {
                if (Array.isArray(error.message)) {
                    errors.value = error.message;
                } else {
                    errors.value.push(error.message);
                }
            });
    }
}
</script>

<template>
    <div class="wrapper">
        <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
            <div class="text-center mb-5">
                <img
                    src="../../assets/images/viewvitLogo.png"
                    alt="Image"
                    height="200"
                    class="mb-3"
                />
                <div class="text-900 text-3xl font-medium mb-3">Register</div>
                <span class="text-600 font-medium line-height-3"
                    >Already have an account?</span
                >
                <RouterLink to="/login">
                    <a
                        class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                        >Sign In!</a
                    >
                </RouterLink>
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
                <label for="nickname" class="block text-900 font-medium mb-2"
                    >Nickname</label
                >
                <InputText
                    v-model.trim="user.nickname"
                    id="nickname"
                    type="text"
                    class="w-full mb-3"
                />

                <label for="name" class="block text-900 font-medium mb-2"
                    >Name</label
                >
                <InputText
                    v-model.trim="user.name"
                    id="name"
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

                <label
                    for="repeatPassword"
                    class="block text-900 font-medium mb-2"
                    >Repeat Password</label
                >
                <InputText
                    v-model="repeatPassword"
                    id="repeatPassword"
                    type="password"
                    class="w-full mb-3"
                />

                <transition-group class="mb-5" name="p-message" tag="div">
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
                    @click="signUp"
                    label="Sign In"
                    icon="pi pi-user"
                    class="w-full"
                ></Button>
            </div>

            <div class="w-full">
                <ProgressSpinner v-show="isLoading" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;
}
</style>
