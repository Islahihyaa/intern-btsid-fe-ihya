import axiosInstance from "@/axios";

export const createTask = async (taskData, accessToken) => {
  try {
    const response = await axiosInstance.post("/tasks", taskData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("response task", response.data);
  } catch (error) {
    console.log("Error task", error.response.data);
    throw error.response.data;
  }
};
