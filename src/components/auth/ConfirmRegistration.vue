<template>
  <div class="flex justify-center items-center mb-8">
    <h1 class="font-sans text-3xl font-semibold text-white">
      Confirm Registration
    </h1>
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

  <form @submit.prevent="handleRegistrationConfirmation">
    <button
      type="submit"
      class="w-full px-4 py-2 text-lg my-4 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
    >
      Verify
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { registrationConfirmation } from "@/services/authService";

const errorMessage = ref([]);
const route = useRoute();
const router = useRouter();

const handleRegistrationConfirmation = async () => {
  const urlRegistrationToken = route.params.urlRegistrationToken;

  try {
    await registrationConfirmation(urlRegistrationToken);

    router.push("/login");
  } catch (error) {
    errorMessage.value = ["Error. Please try again later."];
  }
};
</script>
