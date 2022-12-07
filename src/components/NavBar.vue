<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import type { MenuItem } from "primevue/menuitem";

const props = defineProps({
    logged: Boolean,
});

const logged = props.logged;

const router = useRouter();

const items = ref<MenuItem[]>([
    {
        label: "Home",
        icon: "pi pi-fw pi-home",
        to: { path: "/home" },
    },
    {
        label: "Sign In",
        icon: "pi pi-fw pi-sign-in",
        command: () => {
            router.push({ path: "/login" });
        },
        visible: !logged,
    },
    {
        label: "Profile",
        icon: "pi pi-fw pi-user",
        to: { path: "/home/profile" },
        visible: logged,
    },
    {
        label: "Sign Out",
        icon: "pi pi-fw pi-sign-out",
        command: () => {
            localStorage.clear();
            router.push({ path: "/login" });
        },
        visible: logged,
    },
]);
</script>

<template>
    <nav class="w-full">
        <Menubar
            class="border-primary border-top-none border-left-none border-right-none"
            exact
            :model="items"
        >
            <template #start>
                <img
                    alt="logo"
                    src="../assets/images/viewvitLogo.png"
                    height="50"
                    class="mr-0"
                />
            </template>
        </Menubar>
    </nav>
    <div class="mb-7"></div>
</template>

<style scoped>
nav {
    position: fixed;
    top: 0;
    left: 0;
}
</style>
