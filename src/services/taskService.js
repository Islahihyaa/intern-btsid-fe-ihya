import axiosInstance from "@/axios";

export const createTask = async (taskData, accessToken) => {
  try {
    const response = await axiosInstance.post("/tasks", taskData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("response task", response.data);

    return response.data;
  } catch (error) {
    console.log("Error task", error.response.data);
    throw error.response.data;
  }
};

export const updateTaskOrder = async ({taskId, listId}, accessToken) => {
  try {
    console.log(accessToken)
    const response = await axiosInstance.patch(
      "/tasks",
      { taskId, listId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error board", error.response.data);
    throw error.response.data;
  }
};
