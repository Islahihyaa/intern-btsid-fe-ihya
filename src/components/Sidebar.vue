<template>
  <div class="sidebar bg-base-200 h-full border-r-2 border-slate-600">
    <div class="flex flex-col">
      <ul class="menu w-72 flex-1">
        <div class="py-4 px-2 text-white text-sm mb-1">
          <p>Your Boards</p>
        </div>
        <div class=" overflow-y-auto">
          <li
            v-for="board in $state.boards"
            :key="board.boardId"
            class="m-2"
          >
            <router-link :to="{ path: `/board/${board.boardSlug}` }">
              <div
                @click="showDetailBoard(board.boardId, board.boardSlug)"
                class="m-2"
              >
                <div class="text-md">
                  {{ board.boardTitle }}
                </div>
              </div>
            </router-link>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { getBoard } from "@/services/boardService";
import { onMounted } from "vue";
import { ref } from "vue";
import { useBoardStore } from "@/store/board";

const { $state, setBoardAndSlug } = useBoardStore();
const menuHidden = ref(false);
const emit = defineEmits(["board-selected"]);

const getBoardData = async () => {
  try {
    const accessToken = localStorage.getItem("token");

    await getBoard(accessToken);
  } catch (error) {
    console.error("Error fetching boards:", error);
  }
};

const showDetailBoard = (boardId, boardSlug) => {
  setBoardAndSlug(boardId, boardSlug);
};

onMounted(() => {
  getBoardData();
});
</script>

<style scoped>
a.router-link-exact-active {
  color: rgb(255, 255, 255);
}
a.router-link-active {
  background: rgba(31, 117, 210, 0.644);
  border-radius: 10px;
}
</style>
