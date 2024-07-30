<template>
  <div class="card-tilte">
    <h1 class="text-title">Forgot Password</h1>
  </div>

  <AlertMessage
    v-if="successMessage"
    :message="successMessage"
    type="success"
  />

  <AlertMessage
    v-for="(msg, index) in errorMessages"
    :key="index"
    :message="msg"
    type="error"
  />

  <form @submit.prevent="handleResetPassword">
    <Input type="email" placeholder="Email" v-model="userEmail" />

    <ButtonAuth v-if="!loading" type="submit">Forgot Password</ButtonAuth>
    <ButtonAuth v-if="loading" disabled>
      <span class="loading loading-spinner loading-md" />
    </ButtonAuth>
  </form>
  <p class="text-account">
    <RouterLink to="/login" class="text-blueLight"> Back to Login </RouterLink>
  </p>
</template>

<script setup>
import Joi from "joi";
import { ref } from "vue";
import { resetPassword } from "@/services/authService";
import ButtonAuth from "../ui/ButtonAuth.vue";
import AlertMessage from "../ui/AlertMessage.vue";
import Input from "../ui/Input.vue";
import {
  handleSuccess,
  resetMessage,
  handleError,
  setLoading,
  resetForm,
} from "@/utils/errorUtils";

const userEmail = ref("");
const errorMessages = ref([]);
const successMessage = ref("");
const loading = ref(false);

const handleResetPassword = async () => {
  resetMessage(successMessage, errorMessages);

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
    errorMessages.value = error.details.map((detail) =>
      detail.message.replace(/['"]/g, "")
    );
    return;
  }

  setLoading(loading, true);

  try {
    await resetPassword(emailResetPassword);
    handleSuccess(
      successMessage,
      () => resetMessage(successMessage, errorMessages),
      () => resetForm(userEmail),
      (value) => setLoading(loading, value)
    );
  } catch (err) {
    handleError(
      err,
      (value) => setLoading(loading, value),
      () => resetMessage(successMessage, errorMessages),
      errorMessages,
      () => resetForm(userEmail)
    );
  }
};
</script>
