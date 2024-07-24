import axiosInstance from "@/axios";
import { jwtDecode } from "jwt-decode";

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/register", userData);
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.error.message || 'An unknown error occurred';
    throw new Error(errorMessage);
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
  if (!accessToken) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
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

export const registrationConfirmation = async (urlRegistrationToken) => {
  try {
    const response = await axiosInstance.post(
      `/users/verify/${urlRegistrationToken}`
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
