import axiosiIstance from "@/axios";

export const createBoard = async (boardData) => {
  try {
    const response = await axiosiIstance.post("/boards", boardData);
    console.log("board", response);
    return response.data;
  } catch (error) {
    console.log("Error board", error.response.data);
    throw error.response.data;
  }
};