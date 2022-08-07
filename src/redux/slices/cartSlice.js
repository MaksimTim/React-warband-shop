import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      // Поиск пицц, без дублирования в корзине
      const findItem = state.items.find(
        (obj) =>
          obj.id === payload.id &&
          obj.type === payload.type &&
          obj.size === payload.size
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem: (state, { payload }) => {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === payload.id &&
          obj.size === payload.size &&
          obj.type === payload.type
        );
      });
      findItem && findItem.count--;
      state.totalPrice -= findItem.price;
    },
    removeItem: (state, { payload }) => {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === payload.id &&
          obj.size === payload.size &&
          obj.type === payload.type
        );
      });
      state.totalPrice -= findItem.price * findItem.count;
      state.items = state.items.filter((obj) => {
        return (
          obj.id !== payload.id ||
          obj.size !== payload.size ||
          obj.type !== payload.type
        );
      });
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
