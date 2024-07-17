import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import ResetPassword from "@/views/auth/ResetPassword.vue";
import ConfirmResetPassword from "@/views/auth/ConfirmResetPassword.vue";
import RegistrationConfirmation from "@/views/auth/RegistrationConfirmation.vue";
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
    component: ConfirmResetPassword,
  },
  {
    path: "/users/verify/:urlRegistrationToken",
    name: "ConfirmReset",
    component: RegistrationConfirmation,
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
    path: "/board/:boardId",
    name: "Board",
    component: Home,
    children: [
      {
        path: "",
        name: "ListCard",
        component: ListCard,
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/shared-board/:boardId",
    name: "SharedBoard",
    component: Home,
    children: [
      {
        path: "",
        name: "SharedList",
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
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    next("/login");
  } else {
    next();
  }
});

export default router;
