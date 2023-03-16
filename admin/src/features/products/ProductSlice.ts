import productService from "./ProductService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
interface UserState {
  _id: string;
  title: string;
  price: number;
  category: string[];
  quantity: number;
  stock: number;
  images: string[];
  slug: string;
  description: string;
  tags: string[];
  isPublic: boolean;
  sale: {
    startDate?: Date | null;
    endDate?: Date | null;
    discount?: number | null;
  };
}
interface UserState2 {
  products: UserState[];
  product: UserState | undefined;
  productCount: number;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState: UserState2 = {
  products: [],
  productCount: 0,
  product: undefined,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
interface ProductProps {
  title?: string;
  description?: string;
  price?: number;
  quantity?: number;
  category?: string[];
  tags?: string[];
  images?: string[];
  slug?: string;
  isPublic?: boolean;
  sale?: {
    startDate?: Date | null;
    endDate?: Date | null;
    discount?: number | null;
  };
}
interface getAllProduct {
  title: string;
  page: number;
  category?: string;
  price: string;
}
export const getProducts = createAsyncThunk(
  "products/getAll",
  async (query: string) => {
    try {
      return await productService.getProducts(query);
    } catch (err) {
      console.log(err);
    }
  }
);
export const createProduct = createAsyncThunk(
  "products/create",
  async (product: ProductProps, { rejectWithValue }) => {
    try {
      return await productService.createProduct(product);
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await productService.deleteProduct(id);
      return id;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
export const getProduct = createAsyncThunk(
  "products/get",
  async (id: string) => {
    try {
      return await productService.getProduct(id);
    } catch (err) {
      console.log(err);
    }
  }
);
interface updateProduct {
  id: string;
  product: ProductProps;
}
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, product }: updateProduct) => {
    try {
      return await productService.updateProduct({ data: product, id: id });
    } catch (err) {
      console.log(err);
    }
  }
);
const ProductSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload) {
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
      }

      state.isError = false;
    });
    builder.addCase(getProducts.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.products = [];
      state.message = action.error;
    });
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload) {
        state.products.unshift(action.payload);
      }

      state.isError = false;
    });
    builder.addCase(createProduct.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;

      state.message = action.error;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const id = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.products = state.products.filter((item) => item._id !== id);
      state.isError = false;
    });
    builder.addCase(deleteProduct.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;

      state.message = action.error;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      state.products[index] = action.payload;
      state.product = action.payload;
      state.isError = false;
    });
    builder.addCase(updateProduct.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.product = action.payload;
      state.isError = false;
    });
    builder.addCase(getProduct.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });
  },
});
export default ProductSlice;
