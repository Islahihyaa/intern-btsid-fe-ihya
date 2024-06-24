import axiosInstance from "@/axios";

export const createList = async (listData, accessToken) => {
  try {
    const response = await axiosInstance.post("/lists", listData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("list", response);
    return response.data;
  } catch (error) {
    console.log("Error list", error.response.data);
    throw error.response.data;
  }
};
