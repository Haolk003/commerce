import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axios.config";
import api from "../../utils/useCallApi";
const uploadImage = async (data: any) => {
  const response = await api.post(`/upload`, data);

  return response.data;
};
const deleteImage = async (publicId: string) => {
  const response = await api.delete(`/upload/delete/${publicId}`);

  return response.data;
};
const uploadService = {
  uploadImage,
  deleteImage,
};
export default uploadService;
