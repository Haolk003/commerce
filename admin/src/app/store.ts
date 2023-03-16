import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import userSlice from "../features/customers/customerSlice";
import ProductSlice from "../features/products/ProductSlice";
import PCategoryslice from "../features/pCategory/pCategorySlice";
import orderSlice from "../features/order/orderSlice";
import uploadSlice from "../features/upload/uploadSlice";
import ModalSlice from "../features/ModalDel";
import CouponSlice from "../features/coupon/couponSlice";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    product: ProductSlice.reducer,
    order: orderSlice.reducer,
    upload: uploadSlice.reducer,
    modal: ModalSlice.reducer,
    coupon: CouponSlice.reducer,
    pCategory: PCategoryslice.reducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
