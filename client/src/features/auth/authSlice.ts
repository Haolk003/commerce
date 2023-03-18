import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { SerializedError, isRejectedWithValue } from "@reduxjs/toolkit";
import authService from "./authService";
import { useLocalStorage } from "../../hooks/useLocalStorage";
interface UserState {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  token?: string;
  image?: string;
  address?: string;
  wishList?: ProductState[];
}
interface Rating {
  star: number;
  postedBy: { _id: string; firstName: string; lastName: string; email: string };
  comment: string;
  time: Date;
}
interface ProductQuickView {
  title: string;
  price: number;
  discount: number;
  totalRating: number;
  ratings: any[];
  images: string[];
  id: string;
}
interface AuthState {
  user: UserState | null;
  openWishList: boolean;
  openQuickView: boolean;
  ProductQuickView: ProductQuickView | null;
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
interface ProductState {
  _id: string;
  title: string;
  price: number;
  category: string[];
  quantity: number;
  stock: number;
  images: string[];
  slug: string;
  ratings: [];
  description: string;
  tags: string[];
  isPublic: boolean;
  totalRating: number;
  sale: {
    startDate: Date | null;
    endDate: Date | null;
    discount: number;
  };
}

export const login = createAsyncThunk(
  "auth/admin-login",
  async (user: user, { rejectWithValue }) => {
    try {
      return await authService.login(user);
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message);
      // return err?.response?.data?.message;
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (email: string, { rejectWithValue }) => {
    try {
      return await authService.forgotPassword(email);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
interface resetPasswordProps {
  password: string;
  id: string;
}
export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async ({ password, id }: resetPasswordProps, { rejectWithValue }) => {
    try {
      return await authService.resetPassword(password, id);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
type registerProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
export const register = createAsyncThunk(
  "auth/register",
  async (user: registerProps, { rejectWithValue }) => {
    try {
      console.log("a");
      await authService.register(user);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
type updateProps = {
  firstName?: string;
  lastName?: string;
  image?: string;
  address?: string;
  mobile?: string;
};
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: updateProps, { rejectWithValue }) => {
    try {
      return await authService.updateUser(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const addWishlist = createAsyncThunk(
  "user/addWishlist",
  async (proId: string, { rejectWithValue }) => {
    try {
      return await authService.addWishlist(proId);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const removerWishlist = createAsyncThunk(
  "user/removeWishlist",
  async (proId: string, { rejectWithValue }) => {
    try {
      return await authService.removeWishlist(proId);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const logout = createAsyncThunk("user/logout", async () => {
  try {
    return await authService.logout();
  } catch (err) {
    return console.log(err);
  }
});
export const openQuickView = createAction(
  "openQuickView",
  function prepare(cart: ProductQuickView) {
    return {
      payload: cart,
    };
  }
);
export const closeQuickView = createAction("closeQuickView");

export const resetForm = createAction("reset-form");
export const openWishList = createAction("openWishList");
export const closeWisthList = createAction("closeWislist");
const initialState: AuthState = {
  user: useLocalStorage("user", {}),
  openWishList: false,
  openQuickView: false,
  ProductQuickView: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
interface getUpdate {
  firstName: string;
  lastName: string;
  image: string;
  address: string;
  mobile: string;
}
interface getWishList {
  wishList: [];
}
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
    builder.addCase(login.rejected, (state, action: any) => {
      state.isLoading = false;
      state.user = null;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    });
    builder?.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(register.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    });
    builder?.addCase(forgotPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(forgotPassword.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    });
    builder?.addCase(resetPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = "reset password successfully";
    });
    builder.addCase(resetPassword.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    });
    builder?.addCase(updateUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<getUpdate>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        const User = action.payload;
        state.user = {
          ...state.user,
          firstName: User.firstName,
          lastName: User.lastName,
          mobile: User.mobile,
          image: User.image,
          address: User.address,
        };
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...state.user,
            firstName: User.firstName,
            lastName: User.lastName,
            mobile: User.mobile,
            image: User.image,
            address: User.address,
          })
        );
      }
    );
    builder.addCase(updateUser.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    });
    builder?.addCase(addWishlist.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      addWishlist.fulfilled,
      (state, action: PayloadAction<getWishList>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        const User = action.payload;
        state.user = {
          ...state.user,
          wishList: User.wishList,
        };
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...state.user,
            wishList: User.wishList,
          })
        );
      }
    );
    builder.addCase(addWishlist.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    });
    builder?.addCase(removerWishlist.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      removerWishlist.fulfilled,
      (state, action: PayloadAction<getWishList>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        const User = action.payload;
        state.user = {
          ...state.user,
          wishList: User.wishList,
        };
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...state.user,
            wishList: User.wishList,
          })
        );
      }
    );
    builder.addCase(removerWishlist.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    });

    builder.addCase(resetForm, () => initialState);
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    });
    builder.addCase(logout.rejected, (state) => {
      state.message = "";
    });
    builder.addCase(openWishList, (state) => {
      state.openWishList = true;
    });
    builder.addCase(closeWisthList, (state) => {
      state.openWishList = false;
    });
    builder.addCase(openQuickView, (state, action) => {
      state.openQuickView = true;
      state.ProductQuickView = action.payload;
    });
    builder.addCase(closeQuickView, (state, action) => {
      state.ProductQuickView = null;
      state.openQuickView = false;
    });
  },
});
export default userSlice;
