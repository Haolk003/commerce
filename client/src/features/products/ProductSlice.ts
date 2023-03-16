import productService from "./ProductService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
interface Rating {
  star: number;
  postedBy: { _id: string; firstName: string; lastName: string; email: string };
  comment: string;
  time: Date;
}
interface ProductState {
  _id: string;
  title: string;
  price: number;
  category: string[];
  quantity: number;
  stock: number;
  images: string[];
  slug: string;
  ratings: Rating[];
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

interface ProductState2 {
  products: ProductState[];
  sellingProducts: ProductState[];
  tredingProducts: ProductState[];
  recentlyProducts: ProductState[];
  topRated: ProductState[];
  product: ProductState | undefined;
  productCount: number;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState: ProductState2 = {
  products: [],
  sellingProducts: [],
  tredingProducts: [],
  recentlyProducts: [],
  topRated: [],
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
  title?: string;
  page?: number;
  category?: string;
  price?: string;
}
export const getProducts = createAsyncThunk(
  "products/getAll",
  async (data?: string) => {
    try {
      return await productService.getProducts(data);
    } catch (err) {
      console.log(err);
    }
  }
);
export const getProductSelling = createAsyncThunk(
  "products/getProductsSelling",
  async (page?: number) => {
    try {
      return await productService.getProducts(
        `sale.discount[gt]=1&sort=-sale.discount&page=${page ? page : 1}`
      );
    } catch (err) {
      console.log(err);
    }
  }
);
export const getProductTrending = createAsyncThunk(
  "products/getProductsTrending",
  async () => {
    try {
      return await productService.getProducts("sort=-sold");
    } catch (err) {
      console.log(err);
    }
  }
);
export const getProductRecently = createAsyncThunk(
  "products/getProductRecently",
  async () => {
    try {
      return await productService.getProducts("sort=-updatedAt");
    } catch (err) {
      console.log(err);
    }
  }
);
export const getProductTopRated = createAsyncThunk(
  "products/getProductTopRated",
  async () => {
    try {
      return await productService.getProducts("sort=-totalRating");
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
interface RatingProps {
  star: number;
  comment: string;
  proId: string;
}
export const Rating = createAsyncThunk(
  "products/rating",
  async (data: RatingProps) => {
    try {
      return await productService.rating(data);
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
      state.products = action.payload;

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
    builder.addCase(Rating.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(Rating.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.product = action.payload;
      state.isError = false;
    });
    builder.addCase(Rating.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });
    builder.addCase(getProductRecently.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductRecently.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.recentlyProducts = action.payload;
      state.isError = false;
    });
    builder.addCase(getProductRecently.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });
    builder.addCase(getProductSelling.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductSelling.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.sellingProducts = action.payload;
      state.isError = false;
    });
    builder.addCase(getProductSelling.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    builder.addCase(getProductTrending.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductTrending.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tredingProducts = action.payload;
      state.isError = false;
    });
    builder.addCase(getProductTrending.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });
    builder.addCase(getProductTopRated.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductTopRated.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.topRated = action.payload;
      state.isError = false;
    });
    builder.addCase(getProductTopRated.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });
  },
});
export default ProductSlice;
