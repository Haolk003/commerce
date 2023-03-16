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
const getProducts = async <T>(data: T) => {
  const response = await axios.get(
    `${base_url}/products//getAllPublic?` + data
  );

  return response.data.products;
};
const getProduct = async (id: string) => {
  const response = await axios.get(`${base_url}/products/getProduct/${id}`);
  return response.data;
};
const createProduct = async <T>(productData: T) => {
  const response = await axios.post(
    `${base_url}/products/create`,
    productData,
    config
  );
  console.log(response.data);
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
interface RatingProps {
  star: number;
  comment: string;
  proId: string;
}
const rating = async (data: RatingProps) => {
  const response = await api.put(`/products/rating`, data);
  return response.data;
};
const userService = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  rating,
};
export default userService;
