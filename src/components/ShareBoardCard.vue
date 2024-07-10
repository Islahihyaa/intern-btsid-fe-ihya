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
            <input
              type="text"
              placeholder="Email address ... "
              v-model="collaboratorEmail"
              class="w-full px-4 py-2 my-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
            <div v-if="errorMessageShare">
              <p
                v-for="(msg, index) in errorMessageShare"
                :key="index"
                class="text-red-500 text-xs px-2 py-1 flex justify-center mb-3"
              >
                {{ msg }}
              </p>
            </div>
          </div>
          <div class="card-actions justify-end">
            <button type="button" class="btn btn-ghost" @click="closePopup">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary text-white">
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { sharedBoard } from "@/services/boardService";
import { ref } from "vue";
import { useRoute } from "vue-router";

const popupVisible = ref(true);
const route = useRoute();
const collaboratorEmail = ref("");
const errorMessageShare = ref([])

const formShareBoard = async () => {
  const boardId = route.params.boardId;
  try {
    const emailData = {
      collaboratorEmail: collaboratorEmail.value,
    };
    const accessToken = localStorage.getItem("token");

    await sharedBoard(emailData, accessToken, boardId);

    popupVisible.value = false;
  } catch (error) {
    if (error.error && error.error.message) {
      errorMessageShare.value = [formatErrorMessage(error.error.message)];
    } else {
      console.log("Unknown error", error);
    }
  }
};

const formatErrorMessage = (message) => {
  return message;
};

const closePopup = () => {
  popupVisible.value = false;
};
</script>
