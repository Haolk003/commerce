import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "./orderService";

interface intitalStateData {
  message: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}
const initialState: intitalStateData = {
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
export const addOrder = createAsyncThunk(
  "orders/create",
  async (data: orderProps) => {
    try {
      return await OrderService.addOrder(data);
    } catch (err) {
      console.log(err);
    }
  }
);
const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addOrder.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
  },
});
export default OrderSlice;
