<template>
  <div class="flex justify-center items-center mb-8">
    <h1 class="font-sans text-3xl font-semibold text-white">Forgot Password</h1>
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
      v-if="!loading"
      type="submit"
      class="w-full px-4 py-2 text-lg my-4 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
    >
      Forgot Password
    </button>
    <button
      v-if="loading"
      class="w-full px-4 py-2 text-lg my-4 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
      disabled
    >
      <span class="loading loading-spinner loading-md"></span>
    </button>
  </form>
  <p class="text-sm text-gray-100 mt-4">
    <RouterLink to="/login" class="text-blue-500"> Back to Login </RouterLink>
  </p>
</template>

<script setup>
import Joi from "joi";
import { ref } from "vue";
import { resetPassword } from "@/services/authService";

const userEmail = ref("");
const errorMessage = ref([]);
const successMessage = ref("");
const loading = ref(false);

const handleResetPassword = async () => {
  successMessage.value = "";
  errorMessage.value = [];
  const emailResetPassword = {
    userEmail: userEmail.value,
  };

  const schema = Joi.object({
    userEmail: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": "Email is not allowed to be empty",
      }),
  });

  const { error } = schema.validate(emailResetPassword, { abortEarly: false });
  if (error) {
    errorMessage.value = error.details.map((detail) =>
      detail.message.replace(/['"]/g, "")
    );
    return;
  }

  loading.value = true;

  try {
    errorMessage.value = [];
    await resetPassword(emailResetPassword);
    successMessage.value = "Please cek your email";
    userEmail.value = "";
    loading.value = false;
  } catch (error) {
    loading.value = false;
    successMessage.value = "";
    console.log(error)
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
