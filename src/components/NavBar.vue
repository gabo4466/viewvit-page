<script setup lang="ts">
import { ref } from "vue";
import Menubar from "primevue/menubar";

const items = ref([
    {
        label: "Home",
        icon: "pi pi-fw pi-home",
        to: "/home",
    },
    {
        label: "Profile",
        icon: "pi pi-fw pi-user",
        to: "/home/profile",
    },
    {
        label: "Sign In",
        icon: "pi pi-fw pi-sign-in",
    },
    {
        label: "Sign Out",
        icon: "pi pi-fw pi-sign-out",
    },
]);
</script>

<template>
    <div>
        <Menubar :model="items">
            <template #start>
                <img
                    alt="logo"
                    src="../assets/images/viewvitLogo.png"
                    height="50"
                    class="mr-0"
                />
            </template>
        </Menubar>
    </div>
</template>

<style scoped></style>
