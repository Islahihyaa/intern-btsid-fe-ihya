import axiosInstance from "@/axios";
import { useBoardStore } from "@/store/board";

export const createBoard = async (boardData, accessToken) => {
  try {
    const { addBoard } = useBoardStore();
    const response = await axiosInstance.post("/boards", boardData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response)

    addBoard(response.data);

    console.log("sad", response.data);

    return response.data;
  } catch (error) {
    console.log("Error board", error.response.data);
    throw error.response.data;
  }
};

export const getBoard = async (accessToken) => {
  try {
    const { $state } = useBoardStore();
    const response = await axiosInstance.get("/boards", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    $state.boards = response.data.data;
    console.log("board service",response.data.data);

    return response.data;
  } catch (error) {
    console.log("Error board", error.response.data);
    throw error.response.data;
  }
};
