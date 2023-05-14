<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { usePosts } from "@/composables/usePosts";
import PostComponent from "@/components/Post.vue";
import type { Post } from "@/interfaces/post.interface";
import type { ErrorResponse } from "@/interfaces/responses/error-response.interface";
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";

const props = defineProps<{
    id_post: string;
}>();

const isLoading: Ref<boolean> = ref(false);

const { findOneById } = usePosts();

const router = useRouter();

const route = useRoute();

const reloadKey: Ref<number> = ref(0);

const id_post: string = Array.isArray(route.params.id_post)
    ? route.params.id_post[0]
    : route.params.id_post;

const post: Ref<Post> = ref({
    id_post: props.id_post,
    content: "",
    subject: "",
});

onMounted(() => {
    console.log(id_post);

    findOneById(isLoading, id_post)
        .then((data: Post) => {
            reloadKey.value++;
            post.value = data;
        })
        .catch((error: ErrorResponse) => {
            Swal.fire({
                title: `Something went wrong`,
                confirmButtonText: "Go back to home",
                customClass: {
                    confirmButton: "bg-primary border-primary",
                },
            }).then(() => {
                router.push({ path: "/home" });
                console.log({ error });
            });
        });
});
</script>

<template>
    <div class="surface-card p-4 border-round fadein">
        <div class="wrapper w-full fadein flex justify-content-center">
            <ProgressSpinner v-show="isLoading" />
        </div>
        <PostComponent :key="reloadKey" :post="post"></PostComponent>
    </div>
</template>

<style scoped></style>
