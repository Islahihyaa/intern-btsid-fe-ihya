<template>
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
      <RouterLink to="/forget-password" class="text-blue-400">
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
</template>

<script setup>
import Joi from "joi";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/services/authService";

const email = ref("");
const password = ref("");
const errorMessage = ref([]);
const router = useRouter();

const handleLogin = async () => {
  const userData = {
    email: email.value,
    password: password.value,
  };

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": "Email is not allowed to be empty",
        "string.email": "Email must be a valid email address",
      }),
    password: Joi.string().required().messages({
      "string.empty": "Password is not allowed to be empty",
    }),
  });

  const { error } = schema.validate(userData, { abortEarly: false });

  if (error) {
    errorMessage.value = error.details.map((detail) =>
      detail.message.replace(/['"]/g, "")
    );
    return;
  }

  try {
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
