import { defineStore } from "pinia";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: [],
    lists: [],
    tasks: [],
    sharedBoards: [],
    boardSelected: "",
    slugSelected: "",
    drags: [],
  }),

  actions: {
    addBoard(board) {
      this.boards.push(board);
    },
    setBoardSelected(newValue) {
      this.boardSelected = newValue;
    },
    setSlugSelected(newValue) {
      this.slugSelected = newValue;
    },
    addList(list) {
      if (!this.lists) {
        this.lists = [];
      }
      this.lists.push(list);
    },
    addTask({ listId, task }) {
      const list = this.lists.find((list) => list.listId === listId);
      if (list) {
        list.tasks.push(task);
      }
    },
    addShareBoard(shareBoard) {
      this.sharedBoards.push(shareBoard);
    },
    setBoardAndSlug(boardId, boardSlug) {
      this.boardSelected = boardId;
      this.slugSelected = boardSlug;
    },
  },
});
