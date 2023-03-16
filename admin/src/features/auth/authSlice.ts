import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { SerializedError, isRejectedWithValue } from "@reduxjs/toolkit";
import authService from "./authService";
import { useLocalStorage } from "../../hooks/useLocalStorage";
interface UserState {
  _id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  // mobile: number | null;
  token: string | null;
}
interface AuthState {
  user: UserState | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

type user = {
  email: string;
  password: string;
};
type login = {
  user: user;
};
export const login = createAsyncThunk(
  "auth/admin-login",
  async (user: user, { rejectWithValue }) => {
    try {
      return await authService.login(user);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    return await authService.logout();
  } catch (err) {
    console.log(err);
  }
});
const initialState: AuthState = {
  user: useLocalStorage("user", {}),
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
type RequestState = "pending" | "fulfilled" | "rejected";
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder?.addCase(login?.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
      state.isError = true;
    });
    builder?.addCase(logout?.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    });
    builder.addCase(logout.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
      state.isError = true;
    });
  },
});
export default userSlice;
