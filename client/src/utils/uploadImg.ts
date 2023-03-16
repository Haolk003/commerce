import axios from "axios";
import { base_url } from "./base_url";
import { config } from "./axios.config";

export const uploadImage = async (files: any[]) => {
  console.log(files);
  const formData = new FormData();

  for (let i = 0; i <= files.length - 1; i++) {
    if (files[i]) {
      formData.append("images", files[i]);
    }
  }
  console.log(formData);
  if (formData) {
    const response = await axios.post(`${base_url}/upload`, formData, config);
    const returnData = response.data;
    return returnData;
  }
};
