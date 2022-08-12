import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { CalcTotalPrice } from "../../utils/calcTotalPrice";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  count: number;
  imageUrl: string;
  type: string;
  size: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

export type CartChangeAction = { id: string; type: string; size: number };

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

// Убрал дублирование кода. Ф-я ищет совпадения в корзине для правильной работы редьюсеров.
const refactorFindItem = (state: CartSliceState, payload: CartChangeAction) => {
  return state.items.find(
    (obj) =>
      obj.id === payload.id &&
      obj.type === payload.type &&
      obj.size === payload.size
  );
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<CartItem>) => {
      const findItem = refactorFindItem(state, payload);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...payload, count: 1 });
      }
      state.totalPrice = CalcTotalPrice(state.items);
    },
    plusItem: (state, { payload }: PayloadAction<CartChangeAction>) => {
      const findItem = refactorFindItem(state, payload);

      if (findItem) {
        findItem.count++;
        state.totalPrice += findItem.price;
      }
    },
    minusItem: (state, { payload }: PayloadAction<CartChangeAction>) => {
      const findItem = refactorFindItem(state, payload);

      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
    removeItem: (state, { payload }: PayloadAction<CartChangeAction>) => {
      const findItem = refactorFindItem(state, payload);

      if (findItem) {
        state.totalPrice -= findItem.price * findItem.count;
      }
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById =
  (id: string, typeNamesAT: string, sizesAS: number) => (state: RootState) =>
    state.cart.items.find(
      (obj) =>
        obj.id === id &&
        obj.type === typeNamesAT && //typeNames[activeType]
        obj.size === sizesAS //sizes[activeSize]
    );

export const { addItem, removeItem, plusItem, minusItem, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
