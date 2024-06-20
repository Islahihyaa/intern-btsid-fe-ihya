import axiosiIstance from "@/axios";

export const register = async (userData) => {
  try {
    console.log('Data being sent register:', userData); 
    const response = await axiosiIstance.post("/users/register", userData);
    console.log("register", response);
    return response.data;
  } catch (error) {
    console.log("Error register", error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    console.log('Data being sent login:', userData); 
    const response = await axiosiIstance.post("/users/login", userData);
    console.log("login", response);
    return response.data;
  } catch (error) {
    console.log("Error login", error);
    throw error;
  }
};
