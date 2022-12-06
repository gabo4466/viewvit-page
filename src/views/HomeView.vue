<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import { onMounted } from "vue";
import { useAuth } from "../composables/useAuth";

const { getAccountData } = useAuth();

function loadUser() {
    getAccountData()
        .then((data) => {
            localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((error) => {
            localStorage.clear();
        });
}

onMounted(() => {
    loadUser();
});
</script>

<template>
    <NavBar></NavBar>
    <h1>Home</h1>
</template>
