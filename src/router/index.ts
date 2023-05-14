import AboutViewVue from "@/views/AboutView.vue";
import LoginViewVue from "@/views/auth/LoginView.vue";
import RegisterViewVue from "@/views/auth/RegisterView.vue";
import CreatePostViewVue from "@/views/home/CreatePostView.vue";
import DashBoardViewVue from "@/views/home/DashBoardView.vue";
import PostViewVue from "@/views/home/PostView.vue";
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
                {
                    path: "post/:id_post",
                    name: "post",
                    component: PostViewVue,
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
