import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
