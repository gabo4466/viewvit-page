<script setup lang="ts">
import { onActivated, onMounted, ref, type Ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

import NavBar from "@/components/NavBar.vue";
import { useAuth } from "../composables/useAuth";

const { getAccountData } = useAuth();

const logged: Ref<boolean> = ref(false);

async function loadUser() {
    await getAccountData()
        .then((data) => {
            localStorage.setItem("user", JSON.stringify(data));
            logged.value = true;
        })
        .catch((error) => {
            localStorage.clear();
            logged.value = false;
        });
}

onActivated(() => {
    console.log("Hola mundo");

    loadUser();
});
</script>

<template>
    <NavBar :logged="logged"></NavBar>
    <RouterView />
</template>
