import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axios.config";
import api from "../../utils/useCallApi";
import axios from "axios";
const addCart = async (cart: any) => {
  const response = await api.post(`/cart/addCart`, cart);
  return response.data;
};
const getCarts = async () => {
  const response = await api.get(`/cart/getCart`);
  return response.data;
};
const cartService = {
  addCart,
  getCarts,
};
export default cartService;
