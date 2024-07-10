<template>
  <div class="main-menu">
    <h2 class="text-2xl mb-4">Daftar Board</h2>
    <div
      class="board-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="board in boards"
        :key="board.boardId"
        class="board-item p-4 bg-base-200 rounded shadow"
      >
        <router-link :to="{ path: `/board/${board.boardId}` }" class="block">
          <h3 class="text-xl font-bold mb-2">{{ board.boardTitle }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBoardStore } from "@/store/board";
import { computed } from "vue";

const boardStore = useBoardStore();

const boards = computed(() => boardStore.boards);
</script>

<style scoped>
.main-menu {
  padding: 2rem;
}
.board-item {
  transition: transform 0.2s;
}
.board-item:hover {
  transform: translateY(-2px);
}
</style>
