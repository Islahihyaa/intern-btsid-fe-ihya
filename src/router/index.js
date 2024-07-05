import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import ResetPassword from "@/views/auth/ResetPassword.vue";
import ComfirmResetPassword from "@/views/auth/ComfirmResetPassword.vue";
import Home from "@/views/Home.vue";
import ListCard from "@/components/ListCard.vue";
import SharedList from "@/components/SharedList.vue";
import { isAuthenticated } from "@/services/authService";

const routes = [
  {
    path: "/",
    redirect: "/board",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/users/reset-password/:urlResetToken",
    name: "ConfirmReset",
    component: ComfirmResetPassword,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/reset-password",
    name: "resetPassword",
    component: ResetPassword,
  },
  {
    path: "/board",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/board/:boardSlug',
    name: 'Board',
    component: Home,
    children: [
      {
        path: '',
        name: 'ListCard',
        component: ListCard,
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/shared-board/:boardSlug',
    name: 'SharedBoard',
    component: Home,
    children: [
      {
        path: '',
        name: 'SharedList',
        component: SharedList,
      },
    ],
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/login"); // Arahkan ke halaman login jika tidak authenticated
  } else {
    next(); // Lanjutkan navigasi ke rute yang diminta
  }
});

export default router;
