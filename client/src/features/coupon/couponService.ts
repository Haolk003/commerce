import api from "../../utils/useCallApi";
const checkCoupon = async (code: string) => {
  const response = await api.put(`/coupons/check`, { code: code });
  return response.data;
};
const OrderService = { checkCoupon };
export default OrderService;
