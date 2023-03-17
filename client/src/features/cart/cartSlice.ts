import axios from "axios";
import cartService from "./cartService";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
interface cartProps {
  id: string;
  count: number;
}
interface ProductItem {
  _id: string;
  title: string;
  price: number;
  images: string[];
  sale: {
    discount: number;
  };
}
interface Product {
  product: ProductItem;
  count: number;
}
interface cartData {
  products: Product[];
  cartTotal?: number;
}
interface initialStateType {
  cart: Product[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState: initialStateType = {
  cart: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const addCart = createAction("addcart", function prepare(cart: Product) {
  return {
    payload: { cart: cart },
  };
});
export const deleteCart = createAction(
  "deletecart",
  function prepare(id: string) {
    return {
      payload: id,
    };
  }
);
export const incrementCart = createAction(
  "incrementcart",
  function prepare(id: string) {
    return {
      payload: id,
    };
  }
);
export const RemoveAllCart = createAction("removeAll");
export const decrementCart = createAction(
  "decrementCart",
  function prepare(id: string) {
    return {
      payload: id,
    };
  }
);
export const AddCart = createAsyncThunk(
  "cart/addCart",
  async (cart: cartProps[]) => {
    try {
      await cartService.addCart(cart);
    } catch (err) {
      console.log(err);
    }
  }
);
export const GetCart = createAsyncThunk("cart/getCart", async () => {
  try {
    return await cartService.getCarts();
  } catch (err) {
    console.log(err);
  }
});
const CartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(AddCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddCart.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      // state.cart = action.payload?.products;
      state.isError = false;
    });
    builder.addCase(AddCart.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = action.error;
    });
    builder.addCase(GetCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetCart.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.cart = action.payload?.products;
      state.isError = false;
    });
    builder.addCase(GetCart.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = action.error;
    });
    builder.addCase(addCart, (state, action) => {
      state.isSuccess = true;
      if (action.payload.cart) {
        const findCart = state.cart
          ? state.cart.find(
              (item) => item.product._id === action.payload.cart.product._id
            )
          : null;
        if (findCart) {
          findCart.count =
            Number(findCart.count) + Number(action.payload.cart.count);
        } else {
          if (state.cart && state.cart.length > 0) {
            state.cart.push(action.payload.cart);
          } else {
            state.cart = [action.payload.cart];
          }
        }
      }
      state.isSuccess = false;
    });
    builder.addCase(deleteCart, (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.product._id !== action.payload
      );
    });
    builder.addCase(incrementCart, (state, action) => {
      const findCart = state.cart.find(
        (item) => item.product._id === action.payload
      );
      if (findCart) {
        findCart.count += 1;
      }
    });
    builder.addCase(decrementCart, (state, action) => {
      const findCart = state.cart.find(
        (item) => item.product._id === action.payload
      );
      if (findCart) {
        if (findCart.count > 1) {
          findCart.count -= 1;
        } else {
          state.cart = state.cart.filter(
            (item) => item.product._id !== action.payload
          );
        }
      }
    });
    builder.addCase(RemoveAllCart, () => initialState);
  },
});
export default CartSlice;
