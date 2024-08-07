import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import ListPage from "@/components/ListPage.vue";
import SharedList from "@/components/SharedList.vue";
import { isAuthenticated } from "@/services/authService";
import AuthPage from "@/views/auth/AuthPage.vue";
import NotFound from "../components/layout/NotFound.vue";

const routes = [
  {
    path: "/",
    redirect: "/board",
  },
  {
    path: "/login",
    name: "Login",
    component: AuthPage,
  },
  {
    path: "/register",
    name: "Register",
    component: AuthPage,
  },
  {
    path: "/forget-password",
    name: "resetPassword",
    component: AuthPage,
  },
  {
    path: "/users/reset-password/:urlResetToken",
    name: "ConfirmReset",
    component: AuthPage,
  },
  {
    path: "/users/verify/:urlRegistrationToken",
    name: "ConfirmVerify",
    component: AuthPage,
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
        component: ListPage,
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
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
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
