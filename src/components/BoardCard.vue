<template>
  <div
    v-if="popupVisible"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
  >
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Create Board</h2>
        <form @submit.prevent="handleBoard">
          <div class="mb-4 text-lg">
            <label for="title">Title Board</label>
            <input
              type="text"
              placeholder="Enter title here ..."
              v-model="boardTitle"
              class="w-full px-4 py-2 my-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
            <div v-if="errorMessage">
              <p
                v-for="(msg, index) in errorMessage"
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
            <button type="submit" class="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createBoard } from "@/services/boardService";
import { useBoardStore } from "@/store/board";

const errorMessage = ref([]);

const boardTitle = ref("");
const popupVisible = ref(true);

const boardStore = useBoardStore();

const handleBoard = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("userData")).userId;

    const boardData = {
      boardTitle: boardTitle.value,
      authorId: userId,
    };

    const accessToken = localStorage.getItem("token");

    if (!accessToken || !userId) {
      throw new Error("Access token or userId not found");
    }

    await createBoard(boardData, accessToken);

    boardStore.addBoard(boardData);

    popupVisible.value = false;
  } catch (error) {
    if (error.error.message) {
      errorMessage.value = [formatErrorMessage(error.error.message)];
    } else {
      console.log("Unknown error occurred while creating board.");
    }
  }
};

const formatErrorMessage = (message) => {
  if (message.includes("Board title")) {
    return "Board title cannot be blank";
  }
  return "Create board failed: " + message;
};

const closePopup = () => {
  popupVisible.value = false;
};
</script>
