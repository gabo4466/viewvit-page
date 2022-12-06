<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import type { User } from "@/interfaces/user.interface";
import type { Ref } from "vue";
import { ref } from "vue";

const user: Ref<User> = ref({
    email: "",
    password: "",
});
const errors: Ref<string[]> = ref([]);
const isLoading: Ref<boolean> = ref(false);
const { logIn } = useAuth();

function signUp() {}
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
            <RouterLink to="/auth/register">
                <a
                    class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                    >Create one!</a
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
                @click="signUp"
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
