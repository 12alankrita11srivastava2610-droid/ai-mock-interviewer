import axios from "axios";

const API = axios.create({
 baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
});

export const registerUser = async (userData) => {
  return await API.post("/register", userData);
};

export const loginUser = async (userData) => {
  return await API.post("/login", userData);
};