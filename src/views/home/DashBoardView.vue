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
const limit: number = 5;

function loadPosts() {
    getPosts(isLoading, offset, term, limit)
        .then((data: Post[]) => {
            morePosts.value = true;
            offset += data.length;
            posts.value = posts.value.concat(data);
            if (data.length < limit) {
                morePosts.value = false;
            }
        })
        .catch((error: ErrorResponse) => {
            // TODO: ERRORS
            if (error.statusCode === 404) {
                morePosts.value = false;
            }
        });
}

function searchPosts() {
    posts.value = [];
    offset = 0;
    console.log(term.value);

    loadPosts();
}

onMounted(() => {
    loadPosts();
});
</script>

<template>
    <div class="w-full mt-4 fadein">
        <div class="surface-card shadow-1 px-5 py-3 mb-4">
            <span class="p-input-icon-left w-full">
                <i class="pi pi-search" />
                <InputText
                    class="p-inputtext-lg w-full"
                    type="text"
                    v-model="term"
                    placeholder="Search"
                    @keyup.enter="searchPosts"
                />
            </span>
        </div>
        <div class="surface-card shadow-1 p-5">
            <h1>Dashboard 🔥</h1>
            <PostComponent v-for="post in posts" :post="post"></PostComponent>
            <div class="w-full flex justify-content-center">
                <Button
                    class="scalein animation-duration-1000 animation-delay-1000"
                    v-if="morePosts"
                    @click="loadPosts"
                    label="Load more..."
                />
            </div>

            <div class="wrapper w-full fadein">
                <ProgressSpinner v-show="isLoading" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
