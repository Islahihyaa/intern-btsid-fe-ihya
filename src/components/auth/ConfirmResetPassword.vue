<template>
  <div class="flex justify-center items-center mb-8">
    <h1 class="font-sans text-3xl font-semibold text-white">
      Confirm Reset Password
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
      <p class="text-center">{{ msg }}</p>
    </div>
  </div>

  <form @submit.prevent="handleConfirmResetPassword">
    <div class="mb-4 text-lg">
      <input
        type="password"
        placeholder="New Password"
        v-model="newPassword"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
    <div class="mb-4 text-lg">
      <input
        type="password"
        placeholder="Confirm New Password"
        v-model="newPasswordConfirmation"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <button
      v-if="!loading"
      type="submit"
      class="w-full px-4 py-2 text-lg my-4 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
    >
      Reset Password
    </button>
    <button
      v-if="loading"
      class="w-full px-4 py-2 text-lg my-4 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
      disabled
    >
      <span class="loading loading-spinner loading-md"></span>
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { confirmResetPassword } from "@/services/authService";
import Joi from "joi";

const newPassword = ref("");
const newPasswordConfirmation = ref("");
const errorMessage = ref([]);
const route = useRoute();
const router = useRouter();
const successMessage = ref("");
const loading = ref(false);

const handleConfirmResetPassword = async () => {
  const urlResetToken = route.params.urlResetToken;
  const passwordConfirmationData = {
    newPassword: newPassword.value,
    newPasswordConfirmation: newPasswordConfirmation.value,
  };

  const schema = Joi.object({
    newPassword: Joi.string().min(4).required().messages({
      "string.empty": "Password is not allowed to be empty",
      "string.min": "Password must be at least {#limit} characters long",
    }),
    newPasswordConfirmation: Joi.valid(Joi.ref("newPassword")).messages({
      "any.only": "Password confirmation must match the new password",
    }),
  });

  const { error } = schema.validate(passwordConfirmationData, {
    abortEarly: false,
  });

  if (error) {
    errorMessage.value = error.details.map((detail) =>
      detail.message.replace(/['"]/g, "")
    );
    return;
  }
  try {
    await confirmResetPassword(passwordConfirmationData, urlResetToken);
    loading.value = true;
    
    successMessage.value = "Password changed successfully";
    
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (error) {
    loading.value = false;
    errorMessage.value = ["Error. Please try again later."];
  }
};
</script>
