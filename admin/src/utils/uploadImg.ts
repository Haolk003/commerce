import axios from "axios";
import { base_url } from "./base_url";
import { config } from "./axios.config";
import api from "./useCallApi";
export const uploadImage = async (files: any[]) => {
  console.log(files);
  const formData = new FormData();
  const images = [];
  for (let i = 0; i < files.length; i++) {
    if (files[i].originFileObj) {
      formData.append("images", files[i].originFileObj);
    } else {
      images.push(files[i].url);
    }
  }
  console.log(formData);
  console.log(images);
  let returnData = [...images];
  if (formData.has("images")) {
    const response = await axios.post(`${base_url}/upload`, formData, config);
    returnData = [...images, ...response.data];
  }

  return returnData;
};
