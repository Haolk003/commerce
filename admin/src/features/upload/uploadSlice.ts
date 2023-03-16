import uploadService from "./uploadService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
interface UploadData {
  images: any[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState: UploadData = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const uploadImage = createAsyncThunk(
  "upload/images",
  async (files: any[], { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i].originFileObj);
      }
      console.log(files);
      return await uploadService.uploadImage(formData);
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
export const deleteImage = createAsyncThunk(
  "delete/images",
  async (id: string, { rejectWithValue }) => {
    try {
      return await uploadService.deleteImage(id);
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(uploadImage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadImage.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.images = action.payload;
    });
    builder.addCase(uploadImage.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });
    builder.addCase(deleteImage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteImage.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(deleteImage.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });
  },
});

export default uploadSlice;
