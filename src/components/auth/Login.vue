<template>
  <div class="card-tilte">
    <h1 class="text-title">Login</h1>
  </div>

  <AlertMessage
    v-for="(msg, index) in errorMessages"
    :key="index"
    :message="msg"
    type="error"
  />

  <form @submit.prevent="handleLogin">
    <Input type="email" placeholder="Email" v-model="email" />
    <Input type="password" placeholder="Password" v-model="password" />
    <div>
      <RouterLink to="/forget-password" class="text-blueLight">
        Forget Password
      </RouterLink>
    </div>
    <ButtonAuth type="submit">Login</ButtonAuth>
  </form>

  <p class="text-account">
    <span>Don't have an account?</span>
    <RouterLink to="/register" class="text-blueLight">
      Register Here
    </RouterLink>
  </p>
</template>

<script setup>
import Joi from "joi";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/services/authService";
import ButtonAuth from "../ui/ButtonAuth.vue";
import AlertMessage from "../ui/AlertMessage.vue";
import Input from "../ui/Input.vue";
import { resetForm, handleError, resetMessage } from "@/utils/errorUtils";

const email = ref("");
const password = ref("");
const errorMessages = ref([]);
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
    errorMessages.value = error.details.map((detail) =>
      detail.message.replace(/['"]/g, "")
    );
    return;
  }

  try {
    await login(userData);

    localStorage.getItem("token");
    router.push("/board");
  } catch (err) {
    handleError(
      err,
      null,
      () => resetMessage(null, errorMessages),
      errorMessages,
      () => resetForm(email, password)
    );
  }
};
</script>
