<template>
  <div class="card-tilte">
    <h1 class="text-title">Confirm Reset Password</h1>
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

  <form @submit.prevent="handleConfirmResetPassword">
    <Input type="password" placeholder="New Password" v-model="newPassword" />
    <Input
      type="password"
      placeholder="Confirm New Password"
      v-model="newPasswordConfirmation"
    />
    <ButtonAuth v-if="!loading" type="submit">Reset Password</ButtonAuth>
    <ButtonAuth v-if="loading" disabled>
      <span class="loading loading-spinner loading-md" />
    </ButtonAuth>
  </form>
</template>

<script setup>
import { ref } from "vue";
import Joi from "joi";
import { useRoute, useRouter } from "vue-router";
import { confirmResetPassword } from "@/services/authService";
import ButtonAuth from "../ui/ButtonAuth.vue";
import AlertMessage from "../ui/AlertMessage.vue";
import Input from "../ui/Input.vue";
import { resetMessage, setLoading } from "@/utils/errorUtils";

const newPassword = ref("");
const newPasswordConfirmation = ref("");
const errorMessages = ref([]);
const route = useRoute();
const router = useRouter();
const successMessage = ref("");
const loading = ref(false);

const handleConfirmResetPassword = async () => {
  resetMessage(successMessage, errorMessages)
  
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
    errorMessages.value = error.details.map((detail) =>
      detail.message.replace(/['"]/g, "")
    );
    return;
  }

  try {
    await confirmResetPassword(passwordConfirmationData, urlResetToken);
    setLoading(loading, true);
    successMessage.value = "Password changed successfully";

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (error) {
    setLoading(loading, false);
    errorMessages.value = ["Error. Please try again later."];
  }
};
</script>
