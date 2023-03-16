import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axios.config";
import api from "../../utils/useCallApi";
const getOrders = async (data?: string) => {
  const response = await api.get(`/orders/getAll?` + data);
  return response.data;
};
const totalWeekly = async () => {
  const response = await api.get("/orders/totalWeekly");
  return response.data;
};
const aggOrder = async () => {
  const response = await api.get("/orders/aggOrder");
  return response.data;
};
const classify = async () => {
  const response = await api.get("/orders/classify");
  return response.data;
};
const updateStatus = async (orderId: string, status: string) => {
  const response = await api.put(`/orders/update/${orderId}`, {
    status: status,
  });
  return response.data;
};
const getOrder = async (orderId: string) => {
  const response = await api.get(`/orders/getOrder/${orderId}`);
  return response.data;
};
const orderService = {
  getOrders,
  classify,
  aggOrder,
  totalWeekly,
  updateStatus,
  getOrder,
};
export default orderService;
