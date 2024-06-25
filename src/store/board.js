// store/board.js
import { defineStore } from "pinia";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: JSON.parse(localStorage.getItem("boards")) || [],
  }),
  actions: {
    addBoard(board) {
      this.boards.push(board);
      this.saveBoardsToLocalStorage();
    },
    saveBoardsToLocalStorage() {
      localStorage.setItem("boards", JSON.stringify(this.boards));
    },
  },
});
