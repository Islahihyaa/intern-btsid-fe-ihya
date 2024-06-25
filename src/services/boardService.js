import axiosInstance from "@/axios";

export const createBoard = async (boardData, accessToken) => {
  try {
    const response = await axiosInstance.post("/boards", boardData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("sad", response.data);

    return response.data;
  } catch (error) {
    console.log("Error board", error.response.data);
    throw error.response.data;
  }
};

export const getBoard = async (accessToken) => {
  try {
    const response = await axiosInstance.get("/boards", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('respon', response)
    return response.data;
  } catch (error) {
    console.log("Error board", error.response.data);
    throw error.response.data;
  }
};
