<script setup lang="ts">
import { ref } from "vue";
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
