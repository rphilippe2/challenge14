import axios from "axios";
import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await axios.post("/auth/login", userInfo);
    return response.data; // Usually, this would contain the token or user info
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Rethrow or handle the error appropriately
  }
};

export { login };
