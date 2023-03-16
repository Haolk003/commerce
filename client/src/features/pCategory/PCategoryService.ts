import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axios.config";

const getPCategory = async () => {
  const response = await axios.get(
    `${base_url}/product-categories/getAll`,
    config
  );
  return response.data;
};
const createCategory = async <T>(data: T) => {
  const response = await axios.post(
    `${base_url}/product-categories/create`,
    data,
    config
  );
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
  const response = await axios.put(
    `${base_url}/product-categories/update/${id}`,
    data,
    config
  );
  return response.data;
};
const deleteCategory = async (id: string) => {
  const response = await axios.delete(
    `${base_url}/product-categories/delete/${id}`,
    config
  );
  return response.data;
};
const CategoryService = {
  getPCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
export default CategoryService;
