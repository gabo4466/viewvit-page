<script setup lang="ts">
import type { Post } from "@/interfaces/post.interface";
import Avatar from "primevue/avatar";

const props = defineProps<{
    post: Post;
}>();

const post = props.post;
</script>

<template>
    <!-- POSTS -->
    <div class="surface-50 p-4 shadow-2 border-round mb-4">
        <!-- TITLE -->
        <div class="text-3xl font-medium text-900 mb-3">{{ post.subject }}</div>
        <!-- USER -->
        <div class="flex justify-content-between flex-wrap">
            <div
                v-if="!!post.user"
                class="font-medium text-500 mb-3 text-primary flex align-items-center flex-wrap"
            >
                <span class="mr-1">{{ post.user.nickname }}</span>
                <Avatar
                    :image="
                        'http://localhost:3000/api/files/users/' +
                        post.user.profilePhoto
                    "
                    class="mr-2"
                    shape="circle"
                />
            </div>
            <div class="font-medium text-500 mb-3 text-primary">
                {{ post.lastUpdated }}
            </div>
        </div>
        <!-- CONTENT -->
        <div class="border-2 border-dashed surface-border p-4">
            {{ post.content }}
        </div>
    </div>
</template>

<style scoped></style>
