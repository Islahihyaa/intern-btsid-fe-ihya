<template>
  <div class="card-tilte">
    <h1 class="text-title">Confirm Registration</h1>
  </div>

  <AlertMessage
    v-for="(msg, index) in errorMessages"
    :key="index"
    :message="msg"
    type="error"
  />

  <form @submit.prevent="handleRegistrationConfirmation">
    <ButtonAuth type="submit">Verify</ButtonAuth>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { registrationConfirmation } from "@/services/authService";
import ButtonAuth from "../ui/ButtonAuth.vue";
import AlertMessage from "../ui/AlertMessage.vue";

const errorMessages = ref([]);
const route = useRoute();
const router = useRouter();

const handleRegistrationConfirmation = async () => {
  const urlRegistrationToken = route.params.urlRegistrationToken;

  try {
    await registrationConfirmation(urlRegistrationToken);

    router.push("/login");
  } catch (error) {
    errorMessages.value = ["Error. Please try again later."];
  }
};
</script>
