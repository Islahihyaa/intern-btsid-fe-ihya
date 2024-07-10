import axiosInstance from "@/axios";

export const createList = async (listData, accessToken) => {
  try {
    const response = await axiosInstance.post("/lists", listData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log("Error list", error.response.data);
    throw error.response.data;
  }
};

export const getList = async (accessToken, boardId) => {
  try {
    const response = await axiosInstance.get(`/lists/${boardId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error board", error.response.data);
    throw error.response.data;
  }
};
