<script setup lang="ts">
import type { Ref, unref } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

import Message from "primevue/message";
import Textarea from "primevue/textarea";
import type { Post } from "../../interfaces/post.interface";
import PostComponent from "@/components/Post.vue";
import type { User } from "../../interfaces/user.interface";
import Swal from "sweetalert2";
import { usePosts } from "@/composables/usePosts";
import type { ErrorResponse } from "@/interfaces/responses/error-response.interface";

const router = useRouter();
let user: User = {};

let storage = localStorage.getItem("user");
const isLoading: Ref<boolean> = ref(false);

const { createPost } = usePosts();

if (!!storage) {
    user = JSON.parse(storage);
} else {
    Swal.fire({
        title: "Unauthorized access to Post creation",
        customClass: {
            confirmButton: "bg-primary border-primary",
        },
    }).then(() => {
        router.push({ path: "/home" });
    });
}

const post: Ref<Post> = ref({
    content: "",
    subject: "",
    user,
});

const errors: Ref<string[]> = ref([]);

function create() {
    createPost(isLoading, post)
        .then((data: Post) => {
            Swal.fire({
                title: `Post created succesfully`,
                customClass: {
                    confirmButton: "bg-primary border-primary",
                },
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
</script>

<template>
    <div class="w-full mt-4 xl:p-6 sm:p-2 fadein">
        <div class="wrapper w-full flex justify-content-center">
            <ProgressSpinner v-show="isLoading" />
        </div>
        <div class="">
            <transition-group name="p-message" tag="div">
                <Message
                    v-for="(msg, idx) in errors"
                    severity="error"
                    :key="idx"
                    :closable="false"
                >
                    <span class="">{{ msg }}</span>
                </Message>
            </transition-group>
        </div>
        <h1>Create Post</h1>
        <div class="surface-card shadow-1 p-5 mb-5">
            <h2>Title</h2>
            <InputText class="w-full" v-model="post.subject" />
            <h2>Content</h2>
            <Textarea
                class="w-full mb-3"
                v-model="post.content"
                rows="5"
                cols="30"
            />
            <div class="flex justify-content-center">
                <Button @click="create" label="Post" />
            </div>
        </div>
        <!-- PREVIEW -->
        <h1>Preview</h1>
        <div>
            <PostComponent :post="post"></PostComponent>
        </div>
    </div>
</template>

<style scoped></style>
