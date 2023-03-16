import userService from "./customersService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
interface UserState {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
  createdAt: string;
}
interface UserState2 {
  customers: UserState[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState: UserState2 = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const getUSers = createAsyncThunk(
  "users/getAll",
  async (data?: string) => {
    try {
      return await userService.getUsers(data);
    } catch (err) {
      console.log(err);
    }
  }
);
export const deleteUSer = createAsyncThunk(
  "users/delete",
  async (id: string) => {
    try {
      await userService.delteUser(id);
      return id;
    } catch (err) {
      return console.log(err);
    }
  }
);
const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUSers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUSers.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.customers = action.payload;
      state.isError = false;
    });
    builder.addCase(getUSers.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.customers = [];
      state.message = action.error;
    });
    builder.addCase(deleteUSer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUSer.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.customers = state.customers.filter(
        (item) => item._id !== action.payload
      );
      state.isError = false;
    });
    builder.addCase(deleteUSer.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.customers = [];
      state.message = action.error;
    });
  },
});
export default UserSlice;
