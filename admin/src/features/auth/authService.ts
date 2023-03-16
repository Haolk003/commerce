import axios from "axios";
import { base_url } from "../../utils/base_url";
import api from "../../utils/useCallApi";

interface userData {
  email: string;
  password: string;
}
const login = async (userData: userData) => {
  const response = await axios.post(`${base_url}/auth/admin-login`, userData, {
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
  return response.data;
};
const logout = async () => {
  const response = await api.put(`/auth/logout`);
  return response.data;
};
// const getsUser = async (userData: userData) => {
//   const response = await api.get;
// };
const authService = {
  login,
  logout,
};
export default authService;
