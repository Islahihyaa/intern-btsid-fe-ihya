<template>
  <div
    v-if="popupVisible"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
  >
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title mb-4">Create Board</h2>
        <form @submit.prevent="handleBoard">
          <div class="mb-4 text-lg">
            <label for="title">Title Board</label>
            <Input
              type="text"
              placeholder="Enter title here ..."
              v-model="boardTitle"
              class="my-2"
            />
            <AlertMessage
              v-for="(msg, index) in errorMessages"
              :key="index"
              :message="msg"
              type="error"
              class="text-xs px-2 py-1"
            />
          </div>
          <div class="card-actions justify-end items-center">
            <ButtonCancel @click="closePopup">Cancel</ButtonCancel>
            <ButtonSubmit>Create</ButtonSubmit>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import Joi from "joi";
import { ref } from "vue";
import { createBoard } from "@/services/boardService";
import { useBoardStore } from "@/store/board";
import Input from "../ui/Input.vue";
import ButtonSubmit from "../ui/ButtonSubmit.vue";
import ButtonCancel from "../ui/ButtonCancel.vue";
import AlertMessage from "../ui/AlertMessage.vue";
import { handleError, resetForm, resetMessage } from "@/utils/errorUtils";

const errorMessages = ref([]);
const boardTitle = ref("");
const popupVisible = ref(true);

const boardStore = useBoardStore();

const handleBoard = async () => {
  const validationData = {
    boardTitle: boardTitle.value,
  };
  const schema = Joi.object({
    boardTitle: Joi.string().required().messages({
      "string.empty": "Board title cannot be blank",
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
    const userId = JSON.parse(localStorage.getItem("userData")).userId;

    const boardData = {
      boardTitle: boardTitle.value,
      authorId: userId,
    };

    const accessToken = localStorage.getItem("token");

    if (!accessToken || !userId) {
      throw new Error("Access token or user not found");
    }

    await createBoard(boardData, accessToken);

    boardStore.addBoard(boardData);
    popupVisible.value = false;
    boardStore.getBoardData();
  } catch (err) {
    handleError(
      err,
      null,
      () => resetMessage(null, errorMessages),
      errorMessages,
      () => resetForm(boardTitle)
    );
  }
};

const closePopup = () => {
  popupVisible.value = false;
};
</script>
