import AboutViewVue from "@/views/AboutView.vue";
import LoginViewVue from "@/views/auth/LoginView.vue";
import RegisterViewVue from "@/views/auth/RegisterView.vue";
import CreatePostViewVue from "@/views/home/CreatePostView.vue";
import DashBoardViewVue from "@/views/home/DashBoardView.vue";
import ProfileViewVue from "@/views/home/ProfileView.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            component: LoginViewVue,
        },
        {
            path: "/register",
            component: RegisterViewVue,
        },
        {
            path: "/home",
            component: HomeView,
            children: [
                {
                    path: "",
                    component: DashBoardViewVue,
                },
                {
                    path: "profile",
                    component: ProfileViewVue,
                },
                {
                    path: "create-post",
                    component: CreatePostViewVue,
                },
            ],
        },
        {
            path: "/about",
            component: AboutViewVue,
        },
    ],
});

export default router;
