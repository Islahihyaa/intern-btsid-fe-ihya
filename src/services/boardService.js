import axiosInstance from "@/axios";
import { useBoardStore } from "@/store/board";

export const createBoard = async (boardData, accessToken) => {
  try {
    const response = await axiosInstance.post("/boards", boardData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
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

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const sharedBoard = async (emailData, accessToken, boardSlug) => {
  try {
    const response = await axiosInstance.post(
      `/boards/${boardSlug}/shares`,
      emailData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("shared board response", response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSharedBoard = async (accessToken) => {
  try {
    const { $state } = useBoardStore();
    const response = await axiosInstance.get("boards/shares", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    $state.sharedBoards = response.data.data;

    console.log("get share boards", response.data.data);

    return response.data;
  } catch (error) {}
};
