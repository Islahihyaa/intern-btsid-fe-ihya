<template>
  <div class="sidebar bg-base-200 h-full border-r-2 border-slate-600">
    <div class="min-h-screen">
      <ul class="menu w-72">
        <div class="border-b-2 border-slate-800">
          <div class="flex items-center m-4">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Sidebar component"
                src="/src/assets/images/y-blue.png"
              />
            </div>
            <div class="flex-none ml-3">
              <h1 class="text-white text-lg mb-1">Your Workspaces</h1>
              <p class="text-slate-300 text-sm">Description</p>
            </div>
          </div>
        </div>
        <div class="py-4 px-2">
          <p>Your Boards</p>
        </div>
        <li v-for="board in boards" :key="board.boardId">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <a @click="showDetailBoard">
              {{ board.board_title }}
            </a>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { getBoard } from '@/services/boardService';
import { onMounted } from 'vue';
import { ref } from 'vue';

const boards = ref([]);

const getBoardData = async () => {
  try {
    const accessToken = localStorage.getItem("token");

    const response = await getBoard(accessToken);

    boards.value = response.data.boards;

    console.log("Boards data:", boards.value);
    console.log('response on sidebar', response)
    
  } catch (error) {
    console.error("Error fetching boards:", error.error);
  }
};

const showDetailBoard = async () => {
  
}

onMounted(() => {
  getBoardData(); 
});
</script>
