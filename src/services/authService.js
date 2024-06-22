import axiosiIstance from "@/axios";

export const register = async (userData) => {
  try {
    console.log('Data being sent register:', userData); 
    const response = await axiosiIstance.post("/users/register", userData);
    console.log("register", response);
    return response.data;
  } catch (error) {
    console.log("Error register", error.response.data);
    throw error.response.data;
  }
};

export const login = async (userData) => {
  try {
    console.log('Data being sent login:', userData); 
    const response = await axiosiIstance.post("/users/login", userData);
    console.log("login", response);
    return response.data;
  } catch (error) {
    console.log("Error login", error.response.data);
    throw error.response.data;
  }
};
