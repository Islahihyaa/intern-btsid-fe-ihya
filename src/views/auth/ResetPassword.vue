<template>
  <div
    class="flex justify-center items-center min-h-screen bg-[url('/bg-auth.jpg')] bg-cover"
  >
    <div
      class="w-full max-w-md p-8 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100"
    >
      <div class="flex justify-center items-center mb-8">
        <h1 class="font-sans text-3xl font-semibold text-white">
          Forgot Password
        </h1>
      </div>

      <div v-if="successMessage">
        <div
          class="bg-green-300 border border-green-400 text-green-700 text-xs px-2 py-1 rounded relative flex justify-center mb-3"
        >
          {{ successMessage }}
        </div>
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

      <form @submit.prevent="handleResetPassword">
        <div class="mb-4 text-lg">
          <input
            type="email"
            placeholder="Email"
            v-model="userEmail"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 text-lg my-4 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
        >
          Forgot Password
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { resetPassword } from "@/services/authService";

const userEmail = ref("");
const password = ref("");
const errorMessage = ref([]);
const successMessage = ref("");
const router = useRouter();

const handleResetPassword = async () => {
  try {
    const emailResetPassword = {
      userEmail: userEmail.value,
    };

    await resetPassword(emailResetPassword);
    successMessage.value = "Please cek your email";
  } catch (error) {
    if (error.message) {
      errorMessage.value = [formatErrorMessage(error.message)];
    } else if (error.error && error.error.message) {
      errorMessage.value = [formatErrorMessage(error.error.message)];
    } else {
      errorMessage.value = [
        "An error occurred while resetting the password. Please try again later.",
        error,
      ];
    }
  }
};

const formatErrorMessage = (message) => {
  if (message.includes("Invalid email")) {
    return "Invalid Email Format";
  }
  return "Reset Password failed: " + message;
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
