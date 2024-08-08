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
    drags: [],
  }),

  actions: {
    addBoard(board) {
      this.boards.push(board);
    },
    setBoardSelected(newValue) {
      this.boardSelected = newValue;
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

        socket.on("notifiedCollaborator", (boardData) => {
          const { boardId } = boardData.board;
          const boardExist = this.sharedBoards.find(
            (board) => board.board.boardId === boardId
          );

          if (!boardExist) {
            this.sharedBoards.push(boardData);
          }
        });
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    },
  },
});
