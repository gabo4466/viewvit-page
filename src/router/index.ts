import AboutViewVue from "@/views/AboutView.vue";
import LoginViewVue from "@/views/auth/LoginView.vue";
import RegisterViewVue from "@/views/auth/RegisterView.vue";
import ProfileViewVue from "@/views/home/ProfileView.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/auth",
            children: [
                {
                    path: "login",
                    name: "login",
                    component: LoginViewVue,
                },
                {
                    path: "register",
                    name: "register",
                    component: RegisterViewVue,
                },
            ],
        },
        {
            path: "/home",
            name: "home",
            component: HomeView,
            children: [
                {
                    path: "profile",
                    name: "profile",
                    component: ProfileViewVue,
                },
            ],
        },
        {
            path: "/about",
            name: "about",
            component: AboutViewVue,
        },
    ],
});

export default router;
