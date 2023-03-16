import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import categorySlice from "../features/pCategory/pCategorySlice";
import productSlice from "../features/products/ProductSlice";
import cartSlice from "../features/cart/cartSlice";
import orderSlice from "../features/order/orderSlice";
import couponSlice from "../features/coupon/couponSlice";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    coupon: couponSlice.reducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
