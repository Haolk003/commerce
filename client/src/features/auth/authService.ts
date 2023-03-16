import axios from "axios";
import { config } from "../../utils/axios.config";
import { base_url } from "../../utils/base_url";
import api from "../../utils/useCallApi";
interface userData {
  email: string;
  password: string;
}
const login = async (userData: userData) => {
  const response = await axios.put(`${base_url}/auth/login`, userData, {
    withCredentials: true,
  });
  localStorage.setItem("user", JSON.stringify(response.data));
  localStorage.setItem(
    "token",
    JSON.stringify({
      token: response.data.token,
      expiryTime: response.data.expiryTime,
    })
  );
  console.log(response);
  return response.data;
};
const register = async <T>(userData: T) => {
  const response = await axios.post(`${base_url}/auth/register`, userData);
  return response.data;
};
const updateUser = async <T>(userData: T) => {
  const response = await axios.put(
    `${base_url}/users/updateUser`,
    userData,
    config
  );
  return response.data;
};
const logout = async () => {
  const response = await axios.put(`${base_url}/auth/logout`, {
    withCredentials: true,
  });
  return response.data;
};
const addWishlist = async <T>(proId: T) => {
  const response = await api.put(`/users/addWishlist`, { proId: proId });
  console.log(response.data);
  return response.data;
};
const removeWishlist = async <T>(proId: T) => {
  const response = await api.put(`${base_url}/users/removeWishlist`, {
    proId: proId,
  });
  return response.data;
};
const forgotPassword = async (email: string) => {
  const response = await axios.post(`${base_url}/auth/forgot-password`, {
    email: email,
  });
  return response.data;
};

const resetPassword = async (password: string, id: string) => {
  const response = await axios.put(`${base_url}/auth/reset-password/${id}`, {
    password: password,
  });
  return response.data;
};
const authService = {
  login,
  register,
  updateUser,
  addWishlist,
  removeWishlist,
  forgotPassword,
  resetPassword,
  logout,
};
export default authService;
