import CategoryService from "./PCategoryService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
interface UserState {
  _id: string;
  title: string;
  isPublish?: boolean;
  image: string;
}
interface UserState2 {
  categories: UserState[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState: UserState2 = {
  categories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const getPCategories = createAsyncThunk("pCategory/getAll", async () => {
  try {
    return await CategoryService.getPCategory();
  } catch (err) {
    console.log(err);
  }
});
interface CategoriesProps {
  title?: string;
  isPublish?: boolean;
  image?: string;
}

const PCategoryslice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPCategories.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = action.payload;
      state.isError = false;
    });
    builder.addCase(getPCategories.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.categories = [];
      state.message = action.error;
    });
  },
});
export default PCategoryslice;
