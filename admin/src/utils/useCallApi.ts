import axios from "axios";
import { base_url } from "./base_url";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AxiosProps {
  url: string;
  data?: any;
  method: string;
}
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let accessToken = useLocalStorage("token", {});
console.log(accessToken);
api.interceptors.request.use(
  async (config) => {
    const now = Date.now();

    if (now >= accessToken?.expiryTime && accessToken?.expiryTime) {
      const { data } = await axios.get(
        `http://localhost:5000/api/auth/refreshToken`,
        { withCredentials: true }
      );
      console.log(data);
      accessToken = data;
      localStorage.setItem("token", JSON.stringify(data));
    }
    config.headers.Authorization = `Bearer ${accessToken.token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
