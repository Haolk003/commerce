import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axios.config";
import api from "../../utils/useCallApi";
interface data {
  COD: boolean;
  tripeId: string;
  couponApplied?: string;
  phoneNumber: string;
  address: string;
}
const addOrder = async (data: data) => {
  const response = await api.post(`/orders/create`, data);
  return response.data;
};
const OrderService = { addOrder };
export default OrderService;
