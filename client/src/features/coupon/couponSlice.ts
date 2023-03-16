import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import CouponService from "./couponService";
interface Coupon {
  name: string;
  startDate: string;
  endDate: string;
  code: string;
  discount: number;
}
interface intitalStateData {
  coupon: Coupon | null;
  message: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}
const initialState: intitalStateData = {
  coupon: null,
  message: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
};
interface orderProps {
  COD: boolean;
  tripeId: string;
  couponApplied?: string;
  address: string;
  phoneNumber: string;
}
export const checkCoupon = createAsyncThunk(
  "coupon/check",
  async (code: string, { rejectWithValue }) => {
    try {
      return await CouponService.checkCoupon(code);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const resetCoupon = createAction("resetCoupon");
const CouponSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(checkCoupon.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkCoupon.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.coupon = action.payload;
    });
    builder.addCase(checkCoupon.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    });
    builder.addCase(resetCoupon, () => initialState);
  },
});
export default CouponSlice;
