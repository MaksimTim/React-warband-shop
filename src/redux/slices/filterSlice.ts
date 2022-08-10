import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../store";

export type ActionTypeBBB = {
  categoryId: string;
  sortType: SortTypeType;
  orderType: string
  currentPage: string
}

export type SortTypeType = {
  name: string;
  sortProperty: "rating" | "price" | "title";
};

interface FilterSliceState {
  categoryId: number; //string
  sortType: SortTypeType;
  orderType: string
  currentPage: number;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sortType: {
    name: "популярности",
    sortProperty: "rating",
  },
  orderType: "asc",
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortTypeType>) => {
      state.sortType = action.payload;
    },
    setOrderType: (state, action: PayloadAction<string>) => {
      state.orderType = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<ActionTypeBBB>) => {
      state.categoryId = Number(action.payload.categoryId);
      state.sortType = action.payload.sortType;
      state.orderType = action.payload.orderType;
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const {
  setCategoryId,
  setSortType,
  setOrderType,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
