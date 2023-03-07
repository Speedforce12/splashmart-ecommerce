import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartmart: [],
};

export const CartSlice = createSlice({
  name: "mini",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const existed = state.cartmart.find((item) => item._id === payload._id);
      if (existed) {
        existed.quantity++;
      } else {
        state.cartmart.push({ ...payload, quantity: 1 });
      }
    },

    increment: (state, { payload }) => {
      const item = state.cartmart.find((item) => item._id === payload);
      item.quantity++;
    },

    decrement: (state, { payload }) => {
      const item = state.cartmart.find((item) => item._id === payload);
      if (item.quantity === 1) {
        const index = state.cartmart.findIndex((item) => item._id === payload);
        state.cartmart.splice(index, 1);
      } else {
        item.quantity--;
      }
    },

    removeItem: (state, { payload }) => {
      const index = state.cartmart.findIndex((item) => item._id === payload);
      state.cartmart.splice(index, 1);
    },

    clearCart: (state, action) => {
      state.cartmart = [];
    },
  },
});

export const { increment, decrement, clearCart, removeItem, addToCart } =
  CartSlice.actions;
export default CartSlice.reducer;
