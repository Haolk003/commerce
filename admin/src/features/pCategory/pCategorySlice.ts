import CategoryService from "./PCategoryService";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
interface UserState {
  _id: string;
  title?: string;
  isPublish?: boolean;
  image?: string;
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
export const getPCategories = createAsyncThunk(
  "pCategory/getAll",
  async (search?: string) => {
    try {
      return await CategoryService.getPCategory(search);
    } catch (err) {
      console.log(err);
    }
  }
);
interface CategoriesProps {
  title?: string;
  isPublish?: boolean;
  image?: string;
}
export const createCategory = createAsyncThunk(
  "PCategory/create",
  async (data: CategoriesProps, { rejectWithValue }) => {
    try {
      return await CategoryService.createCategory(data);
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
interface UpdateData {
  data: CategoriesProps;
  id: string;
}
export const updateCategory = createAsyncThunk(
  "PCategories/update",
  async ({ data, id }: UpdateData, { rejectWithValue }) => {
    try {
      return await CategoryService.updateCategory({ data: data, id: id });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "PCategories/delete",
  async (id: string) => {
    try {
      await CategoryService.deleteCategory(id);
      return id;
    } catch (err) {
      console.log(err);
    }
  }
);
export const resetForm = createAction("reset-form");
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

      state.categories = action.payload;
    });
    builder.addCase(getPCategories.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.categories = [];
    });
    builder.addCase(createCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload) {
        state.categories.unshift(action.payload);
      }
      state.isError = false;
      state.message = "create successfully";
    });
    builder.addCase(createCategory.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = "update failure";
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.categories.findIndex(
        (item) => item._id === action.payload._id
      );
      state.categories[index] = action.payload;
      state.isError = false;
      state.message = "update successfully";
    });
    builder.addCase(updateCategory.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.categories = [];
      state.message = "update failure";
    });
    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = state.categories.filter(
        (item) => item._id !== action.payload
      );
      state.isError = false;
    });
    builder.addCase(deleteCategory.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.categories = [];
    });
    builder.addCase(resetForm, (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    });
  },
});
export default PCategoryslice;
