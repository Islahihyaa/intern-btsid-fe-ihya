<template>
  <div
    class="flex justify-center items-center min-h-screen bg-[url('/bg-auth.jpg')] bg-cover"
  >
    <div
      class="w-full max-w-md p-8 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100"
    >
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup>
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import ForgetPassword from "@/components/auth/ForgetPassword.vue";
import ConfirmRegistration from "@/components/auth/ConfirmRegistration.vue";
import ConfirmResetPassword from "@/components/auth/ConfirmResetPassword.vue";
import { shallowRef, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currentComponent = shallowRef(Login);

watch(
  () => route.path,
  (newPath) => {
    if (newPath === "/login") {
      currentComponent.value = Login;
    } else if (newPath === "/register") {
      currentComponent.value = Register;
    } else if (newPath === "/forget-password") {
      currentComponent.value = ForgetPassword;
    } else if (newPath.startsWith("/users/reset-password/")) {
      currentComponent.value = ConfirmResetPassword;
    } else if (newPath.startsWith("/users/verify/")) {
      currentComponent.value = ConfirmRegistration;
    }
  },
  {
    immediate: true,
  }
);
</script>

<style>
.bg-cover {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
}
</style>
