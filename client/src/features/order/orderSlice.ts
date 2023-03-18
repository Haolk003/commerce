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
export const AddOrder = createAsyncThunk(
  "orders/create",
  async (data: orderProps, { rejectWithValue }) => {
    try {
      return await OrderService.addOrder(data);
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(AddOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddOrder.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = "payment successfully";
    });
    builder.addCase(AddOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    });
  },
});
export default OrderSlice;
