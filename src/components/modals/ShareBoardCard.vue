<template>
  <div
    v-if="popupVisible"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
  >
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Share Board</h2>
        <form @submit.prevent="formShareBoard">
          <div class="mb-4 text-lg">
            <label for="title">Input email</label>
            <Input
              type="text"
              placeholder="Email address ..."
              v-model="collaboratorEmail"
              class="my-4"
            />
            <AlertMessage
              v-for="(msg, index) in errorMessages"
              :key="index"
              :message="msg"
              type="error"
              class="text-xs px-2 py-1"
            />
          </div>
          <div class="card-actions justify-end">
            <ButtonCancel @click="closePopup">Cancel</ButtonCancel>
            <ButtonSubmit>Share</ButtonSubmit>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import Joi from "joi";
import { ref } from "vue";
import { sharedBoard } from "@/services/boardService";
import { useBoardStore } from "@/store/board";
import { useRoute } from "vue-router";
import router from "@/router";
import socket from "@/socket";
import Input from "../ui/Input.vue";
import ButtonCancel from "../ui/ButtonCancel.vue";
import ButtonSubmit from "../ui/ButtonSubmit.vue";
import AlertMessage from "../ui/AlertMessage.vue";
import { handleError, resetForm, resetMessage } from "@/utils/errorUtils";

const popupVisible = ref(true);
const collaboratorEmail = ref("");
const errorMessages = ref([]);

const route = useRoute();
const boardStore = useBoardStore();

const formShareBoard = async () => {
  const validationData = {
    collaboratorEmail: collaboratorEmail.value,
  };
  const schema = Joi.object({
    collaboratorEmail: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Email must be a valid email",
        "string.empty": "Email is not allowed to be empty",
      }),
  });
  const { error } = schema.validate(validationData, { abortEarly: false });
  if (error) {
    errorMessages.value = error.details.map((detail) =>
      detail.message.replace(/['"]/g, "")
    );
    return;
  }

  try {
    const emailData = {
      collaboratorEmail: collaboratorEmail.value,
    };
    const boardId = route.params.boardId;
    const accessToken = localStorage.getItem("token");
    const response = await sharedBoard(emailData, accessToken, boardId);

    socket.emit("notifyCollaborator", response.data);

    popupVisible.value = false;
    router.push("/board");

    boardStore.getBoardData();
    boardStore.getSharedBoardData();
  } catch (err) {
    handleError(
      err,
      null,
      () => resetMessage(null, errorMessages),
      errorMessages,
      () => resetForm(collaboratorEmail)
    );
  }
};

const closePopup = () => {
  popupVisible.value = false;
};
</script>
