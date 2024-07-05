import axiosInstance from "@/axios";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/register", userData);
    return response.data;
  } catch (error) {
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
    throw error.response.data;
  }
};

export const isAuthenticated = () => {
  const accessToken = localStorage.getItem("token");
  return !!accessToken;
};

export const logout = async (accessToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.post(
        "users/logout",
        {},
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      resolve(response);
    } catch (error) {
      console.log("error logout", error);
      reject(error);
    }
  });
};

export const resetPassword = async (emailResetPassword) => {
  try {
    const response = await axiosInstance.post(
      "/users/forgot-password",
      emailResetPassword
    );

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error(
        "An unexpected error occurred while resetting the password.",
        error
      );
    }
  }
};

export const confirmResetPassword = async (
  passwordConfirmationData,
  urlResetToken
) => {
  try {
    const response = await axiosInstance.post(
      `/users/reset-password/${urlResetToken}`,
      passwordConfirmationData
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
