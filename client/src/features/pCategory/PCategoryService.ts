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

const CategoryService = {
  getPCategory,
};
export default CategoryService;
