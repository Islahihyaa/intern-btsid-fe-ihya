import axiosInstance from "@/axios";
import { useBoardStore } from "@/store/board";

export const createList = async (listData, accessToken) => {
  try {
    const { $state } = useBoardStore();
    const response = await axiosInstance.post("/lists", listData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // console.log('state.boards',$state.boards);
    // $state.lists = response.data;

    // console.log($state.lists)
    console.log("list on service", response.data.data);

    return response.data.data;
  } catch (error) {
    console.log("Error list", error.response.data);
    throw error.response.data;
  }
};

export const getList = async (accessToken, boardSlug) => {
  try {
    // const { $state } = useBoardStore();
    const response = await axiosInstance.get(`/lists/${boardSlug}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("get list response", response);
    // const lists = response.data.data.map((board) => {
    //   console.log(board.lists);
    // });
    // $state.lists = response.data.data;
    // console.log("state list", lists);

    return response.data;
  } catch (error) {
    console.log("Error board", error.response.data);
    throw error.response.data;
  }
};
