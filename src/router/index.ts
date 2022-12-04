import AboutViewVue from "@/views/AboutView.vue";
import LoginViewVue from "@/views/auth/LoginView.vue";
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
            ],
        },
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/about",
            name: "about",
            component: AboutViewVue,
        },
    ],
});

export default router;
