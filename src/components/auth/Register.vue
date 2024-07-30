<template>
  <div class="card-tilte">
    <h1 class="text-title">Register</h1>
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

  <form @submit.prevent="handleRegister">
    <Input type="email" placeholder="Email" v-model="email" />
    <Input type="text" placeholder="Name" v-model="name" />
    <Input type="password" placeholder="Create Password" v-model="password" />
    <Input
      type="password"
      placeholder="Confirm Password"
      v-model="passwordConfirmation"
    />

    <ButtonAuth v-if="!loading" type="submit">Register</ButtonAuth>
    <ButtonAuth v-if="loading" disabled>
      <span class="loading loading-spinner loading-md" />
    </ButtonAuth>
  </form>

  <p class="text-account">
    <span>Already have an account?</span>
    <RouterLink to="/login" class="text-blueLight"> Login Here </RouterLink>
  </p>
</template>

<script setup>
import { ref } from "vue";
import Joi from "joi";
import { register } from "@/services/authService";
import ButtonAuth from "../ui/ButtonAuth.vue";
import AlertMessage from "../ui/AlertMessage.vue";
import Input from "../ui/Input.vue";
import {
  handleError,
  handleSuccess,
  resetForm,
  resetMessage,
  setLoading,
} from "@/utils/errorUtils";

const email = ref("");
const name = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const successMessage = ref("");
const errorMessages = ref([]);
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
  resetMessage(successMessage, errorMessages);

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

  setLoading(loading, true);

  try {
    await register(userData);
    handleSuccess(
      successMessage,
      () => resetMessage(successMessage, errorMessages),
      () => resetForm(email, name, password, passwordConfirmation),
      (value) => setLoading(loading, value)
    );
  } catch (err) {
    handleError(
      err,
      (value) => setLoading(loading, value),
      () => resetMessage(successMessage, errorMessages),
      errorMessages,
      () => resetForm(email, name, password, passwordConfirmation)
    );
  } finally {
    setLoading(loading, false);
  }
};
</script>
