import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axios.config";
import api from "../../utils/useCallApi";
const getPCategory = async (search?: string) => {
  const response = await axios.get(
    `${base_url}/product-categories/getAll${
      search !== "" ? `?title=${search}` : ""
    }`,
    config
  );
  return response.data;
};
const createCategory = async <T>(data: T) => {
  const response = await api.post(`/product-categories/create`, data);
  return response.data;
};
interface UserState {
  title?: string;
  isPublish?: boolean;
  image?: string;
}

interface UpdateData {
  data: UserState;
  id: string;
}
const updateCategory = async ({ data, id }: UpdateData) => {
  const response = await api.put(`/product-categories/update/${id}`, data);
  return response.data;
};
const deleteCategory = async (id: string) => {
  const response = await api.delete(`/product-categories/delete/${id}`);
  return response.data;
};
const CategoryService = {
  getPCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
export default CategoryService;
