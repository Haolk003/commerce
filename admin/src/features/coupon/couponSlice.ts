import couponService from "./couponService";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
interface CouponData {
  name: string;
  startDate: string;
  endDate: string;
  code: string;
  _id: string;
  discount: number;
}
interface initialState {
  coupons: CouponData[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}
const initialState: initialState = {
  coupons: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
export const getCoupons = createAsyncThunk(
  "coupons/getAll",
  async (data?: string) => {
    try {
      return await couponService.getsCoupon(data);
    } catch (err) {
      return console.log(err);
    }
  }
);
interface CouponProps {
  name: string;
  startDate: Date;
  endDate: Date;
  code: string;
  discount: number;
}
export const createCoupons = createAsyncThunk(
  "coupons/create",
  async (data: CouponProps) => {
    try {
      return await couponService.createCoupon(data);
    } catch (err) {
      return console.log(err);
    }
  }
);
interface CouponPropsUpdate {
  data: CouponProps;
  id: string;
}

export const updateCoupons = createAsyncThunk(
  "coupons/update",
  async ({ data, id }: CouponPropsUpdate) => {
    try {
      return await couponService.updateCoupon(data, id);
    } catch (err) {
      return console.log(err);
    }
  }
);
export const deleteCoupons = createAsyncThunk(
  "coupons/delete",
  async (id: string) => {
    try {
      await couponService.deleteCoupon(id);
      return id;
    } catch (err) {
      return console.log(err);
    }
  }
);
const CouponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCoupons.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCoupons.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.coupons = action.payload;
    });
    builder.addCase(getCoupons.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    });
    builder.addCase(createCoupons.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCoupons.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.coupons.push(action.payload);
    });
    builder.addCase(createCoupons.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    });
    builder.addCase(updateCoupons.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCoupons.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      const index = state.coupons.findIndex(
        (item) => item._id === action.payload._id
      );
      state.coupons[index] = action.payload;
    });
    builder.addCase(updateCoupons.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    });
    builder.addCase(deleteCoupons.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCoupons.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.coupons = state.coupons.filter(
        (item) => item._id !== action.payload
      );
    });
    builder.addCase(deleteCoupons.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    });
  },
});
export default CouponSlice;
