import { getBoard, getSharedBoard } from "@/services/boardService";
import socket from "@/socket";
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
    async getBoardData() {
      try {
        const accessToken = localStorage.getItem("token");

        await getBoard(accessToken);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    },
    async getSharedBoardData() {
      try {
        const accessToken = localStorage.getItem("token");

        await getSharedBoard(accessToken);
        // const dataBoard = response.data
        // const boardComputed = computed(() => {
        //   return dataBoard.find(
        //     (item) => (item.board.boardId = route.params.boardId)
        //   );
        // });
        // console.log('asd',boardComputed);

        // socket.emit("join-board", response.data);

        socket.on("notifiedCollaborator", (boardData) => {
          this.sharedBoards.push(boardData);
        });
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    },
  },
});
