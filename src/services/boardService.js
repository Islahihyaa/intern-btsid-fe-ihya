import axiosInstance from "@/axios";

export const createBoard = async (boardData, accessToken) => {
  try {
    const response = await axiosInstance.post("/boards", boardData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.log("Error board", error.response.data);
    throw error.response.data;
  }
};