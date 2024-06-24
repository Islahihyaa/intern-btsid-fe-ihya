import axiosInstance from "@/axios";
import { jwtDecode } from "jwt-decode";

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/register", userData);
    console.log("Data being sent register:", response);
    return response.data;
  } catch (error) {
    console.log("Error register", error.response.data);
    throw error.response.data;
  }
};

export const login = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/login", userData);

    const token = response.data.data.accessToken;

    localStorage.setItem("token", token);

    const decodedToken = jwtDecode(token);
    const user = {
      userId: decodedToken.userId,
      name: decodedToken.name,
    };

    localStorage.setItem("userData", JSON.stringify(user));

    return user;
  } catch (error) {
    console.log("Error login", error.response.data);
    throw error.response.data;
  }
};
