import axiosInstance from "@/axios";
import { useBoardStore } from "@/store/board";

export const createList = async (listData, accessToken) => {
  try {
    // const { addList } = useBoardStore();
    const response = await axiosInstance.post("/lists", listData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("list on service", response.data);
    // addList(response.data);

    return response.data;
  } catch (error) {
    console.log("Error list", error.response.data);
    throw error.response.data;
  }
};
