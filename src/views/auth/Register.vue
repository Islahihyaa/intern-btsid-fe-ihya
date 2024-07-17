<template>
  <div
    class="flex justify-center items-center min-h-screen bg-[url('/bg-auth.jpg')] bg-cover"
  >
    <div
      class="w-full max-w-md p-8 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100"
    >
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
          type="submit"
          class="w-full px-4 py-2 text-lg my-4 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
        >
          Register
        </button>
      </form>

      <p class="text-sm text-gray-100 mt-4">
        <span>Already have an account?</span>
        <RouterLink to="/login" class="text-blue-500"> Login Here </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { register } from "@/services/authService";
import Joi from "joi";

const email = ref("");
const name = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const errorMessages = ref([]);
const successMessage = ref("");

const handleRegister = async () => {
  const userData = {
    email: email.value,
    name: name.value,
    password: password.value,
    passwordConfirmation: passwordConfirmation.value,
  };

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
    passwordConfirmation: Joi.valid(Joi.ref("password")).messages({
      "any.only": "Password confirmation must match the password",
    }),
  });

  const { error } = schema.validate(userData, { abortEarly: false });

  if (error) {
    errorMessages.value = error.details.map((detail) =>
      detail.message.replace(/['"]/g, "")
    );
    return;
  }
  try {
    await register(userData);

    successMessage.value = "Please check your email!";

    email.value = "";
    name.value = "";
    password.value = "";
    passwordConfirmation.value = "";
    
  } catch (error) {
    if (error.error && error.error.message) {
      errorMessages.value = formatErrorMessage(error.error.message);
    } else {
      errorMessages.value = [
        "An error occurred while registering. Please try again later.",
      ];
    }
  }
};

const formatErrorMessage = (message) => {
  const messages = message.split("; ");
  const formattedMessages = messages.map((msg) => {
    if (msg.includes("Invalid email")) {
      return "Invalid email format";
    }

    const charMatch = msg.match(
      /String must contain at least (\d+) character\(s\) at "(.*?)"/
    );

    if (charMatch) {
      const [, charCount, field] = charMatch;
      return `${capitalizeFirstLetter(
        field
      )} must contain at least ${charCount} characters`;
    }
    return msg;
  });

  return formattedMessages;
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
</script>
