<template>
  <div class="flex justify-center items-center mb-8">
    <h1 class="font-sans text-3xl font-semibold text-white">Register</h1>
  </div>

  <div v-if="errorMessages.length > 0">
    <div
      v-for="(errorMessage, index) in errorMessages"
      :key="index"
      class="bg-red-300 border border-red-400 text-red-700 px-2 py-1 rounded relative flex justify-center mb-3"
    >
      {{ errorMessage }}
    </div>
  </div>

  <div v-if="successMessage.length > 0">
    <div
      class="bg-green-300 border border-green-400 text-green-700 px-2 py-1 rounded relative flex justify-center mb-3"
    >
      {{ successMessage }}
    </div>
  </div>

  <form @submit.prevent="handleRegister">
    <div class="mb-4 text-lg">
      <input
        type="text"
        placeholder="Email"
        v-model="email"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
    <div class="mb-4 text-lg">
      <input
        type="text"
        placeholder="Name"
        v-model="name"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
    <div class="mb-4 text-lg">
      <input
        type="password"
        placeholder="Create Password"
        v-model="password"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
    <div class="mb-4 text-lg">
      <input
        type="password"
        placeholder="Confirm Password"
        v-model="passwordConfirmation"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 placeholder-gray-400"
      />
    </div>

    <button
      v-if="!loading"
      type="submit"
      class="w-full px-4 py-2 text-lg my-4 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
    >
      Register
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
    <span>Already have an account?</span>
    <RouterLink to="/login" class="text-blue-500"> Login Here </RouterLink>
  </p>
</template>

<script setup>
import { ref } from "vue";
import Joi from "joi";
import { register } from "@/services/authService";

const email = ref("");
const name = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const errorMessages = ref([]);
const successMessage = ref("");
const loading = ref(false);

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email is not allowed to be empty",
    }),
  name: Joi.string().min(3).required().messages({
    "string.empty": "Name is not allowed to be empty",
    "string.min": "Name must be at least {#limit} characters long",
  }),
  password: Joi.string().min(4).required().messages({
    "string.empty": "Password is not allowed to be empty",
    "string.min": "Password must be at least {#limit} characters long",
  }),
  passwordConfirmation: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Password confirmation must match the password",
      "string.empty": "Password confirmation is required",
    }),
});

const handleRegister = async () => {
  successMessage.value = "";
  errorMessages.value = [];

  const userData = {
    email: email.value,
    name: name.value,
    password: password.value,
    passwordConfirmation: passwordConfirmation.value,
  };

  const { error } = schema.validate(userData, { abortEarly: false });

  if (error) {
    errorMessages.value = error.details.map((detail) => detail.message);
    return;
  }

  loading.value = true;

  try {
    await register(userData);
    successMessage.value = "Please check your email!";
    email.value = "";
    name.value = "";
    password.value = "";
    passwordConfirmation.value = "";
  } catch (err) {
    console.log(err)
    errorMessages.value = [ err ||
      err.response?.data?.error ||
        "An error occurred while registering. Please try again later.",
    ];
    loading.value = false;
  } finally {
    loading.value = false;
  }
};
</script>
