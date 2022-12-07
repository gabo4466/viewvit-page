<script setup lang="ts">
import type { Ref } from "vue";
import { ref, onMounted } from "vue";

import PostComponent from "@/components/Post.vue";
import type { Post } from "@/interfaces/post.interface";
import { usePosts } from "../../composables/usePosts";
import type { ErrorResponse } from "@/interfaces/responses/error-response.interface";

const posts: Ref<Post[]> = ref([]);
const isLoading: Ref<boolean> = ref(false);
const { getPosts } = usePosts();

const term = ref("");
let offset = 0;
const morePosts = ref(true);

onMounted(() => {
    getPosts(isLoading, offset, term)
        .then((data: Post[]) => {
            posts.value = data;
        })
        .catch((error: ErrorResponse) => {
            // TODO: ERRORS
            if (error.statusCode === 404) {
                morePosts.value = false;
            }
        });
});
</script>

<template>
    <div class="w-full mt-4">
        <div class="surface-card shadow-1 p-5">
            <h1>Recent posts 🔥</h1>
            <PostComponent v-for="post in posts" :post="post"></PostComponent>
            <div class="wrapper w-full">
                <ProgressSpinner v-show="isLoading" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
