import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface initialState {
  open: boolean;
  data: {
    name: string;
    type: string;
    id: string;
  } | null;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState: initialState = {
  open: false,
  data: null,
  isLoading: false,
  isSuccess: false,
  message: "",
};
interface dataProps {
  name: string;
  type: string;
  id: string;
}
export const openCart = createAction(
  "openCart",
  function prepare(data: dataProps) {
    return {
      payload: data,
    };
  }
);
export const closeCart = createAction("closeCart");

const ModalSlice = createSlice({
  name: "Modal",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(openCart, (state, action) => {
      state.open = true;
      state.data = action.payload;
    });
    builder.addCase(closeCart, () => initialState);
  },
});
export default ModalSlice;
