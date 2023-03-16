import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axios.config";
import api from "../../utils/useCallApi";
interface CustomerData {}
const getUsers = async (data?: string) => {
  const response = await api.get(`/users/getsAll?` + data);
  return response.data;
};
const delteUser = async (id: string) => {
  const response = await api.delete(`/users/deleteUser/${id}`);
  return response.data;
};
const userService = {
  getUsers,
  delteUser,
};
export default userService;
