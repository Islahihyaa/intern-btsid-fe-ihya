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
    if (error.response && error.response.status === 404) {
      return null;
    } else {
      throw error.response ? error.response.data : error;
    }
  }
};
