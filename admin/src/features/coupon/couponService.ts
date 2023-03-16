import api from "../../utils/useCallApi";
const getsCoupon = async (data?: string) => {
  const response = await api.get("/coupons/getAll?" + data);
  return response.data;
};
const createCoupon = async <T>(data: T) => {
  const response = await api.post("/coupons/create", data);
  return response.data;
};
const updateCoupon = async <T>(data: T, id: string) => {
  const response = await api.put(`/coupons/update/${id}`, data);
  return response.data;
};
const deleteCoupon = async (id: string) => {
  const response = await api.delete(`coupons/delete/${id}`);
  return response.data;
};
const couponService = {
  getsCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
export default couponService;
