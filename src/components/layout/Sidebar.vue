<template>
  <div
    class="sidebar bg-base-200 border-r-2 border-slate-600 overflow-y-auto h-screen"
  >
    <div class="flex flex-col">
      <ul class="menu w-72 flex-1">
        <div class="py-4 px-2 text-white text-sm mb-1">
          <p>Your Boards</p>
        </div>
        <div class="overflow-y-auto">
          <li v-for="board in $state.boards" :key="board.boardId" class="m-2">
            <router-link :to="{ path: `/board/${board.boardId}` }">
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
      <ul class="menu w-72 flex-1">
        <div class="py-4 px-2 text-white text-sm mb-1">
          <p>Share Boards</p>
        </div>
        <div class="overflow-y-auto">
          <li
            v-for="sharedBoard in $state.sharedBoards"
            :key="sharedBoard.board.boardId"
            class="m-2"
          >
            <router-link
              :to="{ path: `/shared-board/${sharedBoard.board.boardId}` }"
            >
              <div
                @click="
                  showDetailBoard(
                    sharedBoard.board.boardId,
                    sharedBoard.board.boardSlug
                  )
                "
                class="m-2"
              >
                <div class="text-md">
                  {{ sharedBoard.board.boardTitle }}
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
import { onMounted } from "vue";
import { useBoardStore } from "@/store/board";

const { $state, setBoardAndSlug } = useBoardStore();
const boardStore = useBoardStore();

const showDetailBoard = (boardId, boardSlug) => {
  setBoardAndSlug(boardId, boardSlug);
};

onMounted(() => {
  boardStore.getBoardData();
  boardStore.getSharedBoardData();
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
