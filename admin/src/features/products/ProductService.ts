import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axios.config";
import api from "../../utils/useCallApi";
interface getAllProduct {
  title?: string;
  page?: number;
  category?: string;
  price?: string;
}
const getProducts = async (data: string) => {
  const response = await api.get(`/products/getAll?` + data);

  return response.data;
};
const getProduct = async (id: string) => {
  const response = await api.get(`/products/getProduct/${id}`);
  return response.data;
};
const createProduct = async <T>(productData: T) => {
  const response = await api.post(`/products/create`, productData);
  return response.data;
};

interface updateProductProps {
  data: any;
  id: string;
}
const updateProduct = async <T>({ data, id }: updateProductProps) => {
  const response = await api.put(`/products/update/${id}`, data);
  return response.data;
};
const deleteProduct = async <T>(id: T) => {
  const response = await api.delete(`/products/delete/${id}`);
  return response.data;
};
const userService = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
};
export default userService;
