import axiosInstance from "@/axios";

export const createTask = async (taskData, accessToken) => {
  try {
    const response = await axiosInstance.post("/tasks", taskData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateTaskOrder = async (data, accessToken) => {
  try {
    const response = await axiosInstance.patch("/tasks", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
