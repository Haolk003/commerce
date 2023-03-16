import orderService from "./orderService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
interface UserOrder {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}
interface paymentIntent {
  method: string;
  amount: number;
}
interface OrderState {
  _id: string;
  orderStatus: string;
  orderBy: UserOrder;
  paymentIntent: paymentIntent;
  address: string;
  phone: string;
  createdAt: string;
}
interface Product {
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
    discount: number;
  };
}
interface OrderDetail {
  _id: string;
  orderStatus: string;
  orderBy: UserOrder;
  paymentIntent: paymentIntent;
  address: string;
  phone: string;
  createdAt: string;
  products: [{ product: Product; count: number }];
}
interface totalWeekly {
  date: string;
  totalSale: number;
  totalOrder: number;
}
interface classify {
  count: number;
  orderStatus: string;
}
interface orderDay {
  _id: string;
  total_orders: number;
  sum_price: number;
}
interface orderMonth {
  _id: string;
  total_orders: number;
  sum_price: number;
}
interface aggOrder {
  orderDay: orderDay[];
  orderMonth: orderMonth[];
}
interface OrderState2 {
  orders: OrderState[];
  orderCount: number;
  order: OrderDetail | null;
  aggOrder: aggOrder | null;
  classify: classify[];
  totalWeekly: totalWeekly[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState: OrderState2 = {
  orders: [],
  orderCount: 0,
  order: null,
  aggOrder: null,
  classify: [],
  totalWeekly: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const getOrders = createAsyncThunk(
  "orders/getAll",
  async (data?: string) => {
    try {
      return await orderService.getOrders(data);
    } catch (err) {
      console.log(err);
    }
  }
);
export const totalAggOrder = createAsyncThunk("orders/aggOrder", async () => {
  try {
    return await orderService.aggOrder();
  } catch (err) {
    return console.log(err);
  }
});
export const classifyOrder = createAsyncThunk("orders/classify", async () => {
  try {
    return await orderService.classify();
  } catch (err) {
    return console.log(err);
  }
});
export const totalWeekly = createAsyncThunk("orders/totalWeekly", async () => {
  try {
    return await orderService.totalWeekly();
  } catch (err) {
    return console.log(err);
  }
});
interface updateStatusProps {
  status: string;
  orderId: string;
}
export const updateStatus = createAsyncThunk(
  "orders/upateStatus",
  async (data: updateStatusProps) => {
    try {
      return await orderService.updateStatus(data.orderId, data.status);
    } catch (err) {
      return console.log(err);
    }
  }
);
export const getOrder = createAsyncThunk(
  "orders/getOrder",
  async (orderId: string) => {
    try {
      return await orderService.getOrder(orderId);
    } catch (err) {
      return console.log(err);
    }
  }
);
const orderslice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.orders = action.payload.orders;
      state.orderCount = action.payload.orderCount;
      state.isError = false;
    });
    builder.addCase(getOrders.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.orders = [];
      state.message = action.error;
    });
    builder.addCase(getOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrder.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.order = action.payload;
      state.isError = false;
    });
    builder.addCase(getOrder.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.orders = [];
      state.message = action.error;
    });
    builder.addCase(updateStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateStatus.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      console.log(action.payload);
      if (action.payload) {
        const index = state.orders.findIndex(
          (item) => item._id === action.payload._id
        );
        state.orders[index] = action.payload;
      }

      state.isError = false;
    });
    builder.addCase(updateStatus.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.orders = [];
      state.message = action.error;
    });
    builder.addCase(totalAggOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(totalAggOrder.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.aggOrder = action.payload;
      state.isError = false;
    });
    builder.addCase(totalAggOrder.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.orders = [];
      state.message = action.error;
    });
    builder.addCase(totalWeekly.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(totalWeekly.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.totalWeekly = action.payload;
      state.isError = false;
    });
    builder.addCase(totalWeekly.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.orders = [];
      state.message = action.error;
    });
    builder.addCase(classifyOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(classifyOrder.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.classify = action.payload;
      state.isError = false;
    });
    builder.addCase(classifyOrder.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.orders = [];
      state.message = action.error;
    });
  },
});
export default orderslice;
