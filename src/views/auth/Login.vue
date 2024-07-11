<template>
  <div
    class="flex justify-center items-center min-h-screen bg-[url('/bg-auth.jpg')] bg-cover"
  >
    <div
      class="w-full max-w-md p-8 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100"
    >
      <div class="flex justify-center items-center mb-8">
        <h1 class="font-sans text-3xl font-semibold text-white">Login</h1>
      </div>

      <div v-if="errorMessage.length > 0">
        <div
          v-for="(msg, index) in errorMessage"
          :key="index"
          class="bg-red-300 border border-red-400 text-red-700 text-xs px-2 py-1 rounded relative flex justify-center mb-3"
        >
          {{ msg }}
        </div>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-4 text-lg">
          <input
            type="email"
            placeholder="Email"
            v-model="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div class="mb-4 text-lg">
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div>
          <RouterLink to="/reset-password" class="text-blue-400">
            Forget Password
          </RouterLink>
        </div>

        <button
          type="submit"
          class="w-full px-4 py-2 text-lg my-4 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
        >
          Login
        </button>
      </form>

      <p class="text-sm text-gray-100 mt-4">
        <span>Don't have an account?</span>
        <RouterLink to="/register" class="text-blue-500">
          Register Here
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/services/authService";

const email = ref("");
const password = ref("");
const errorMessage = ref([]);
const router = useRouter();

const handleLogin = async () => {
  try {
    const userData = {
      email: email.value,
      password: password.value,
    };

    await login(userData);

    localStorage.getItem("token");
    router.push("/board");
  } catch (error) {
    if (error.error && error.error.message) {
      errorMessage.value = [formatErrorMessage(error.error.message)];
    } else {
      errorMessage.value = [
        "An error occurred while logging in. Please try again later.",
      ];
    }
  }
};

const formatErrorMessage = (message) => {
  if (message.includes("Invalid email")) {
    return "Invalid Email Format";
  }
  return "Login failed: " + message;
};
</script>

<style>
.bg-cover {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
}
</style>
