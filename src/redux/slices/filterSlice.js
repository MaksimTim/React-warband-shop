import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.categoryId = Number(action.payload.categoryId);
      state.sortType = action.payload.sortType;
      state.orderType = action.payload.orderType;
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const selectFilter = (state) => state.filter;

export const {
  setCategoryId,
  setSortType,
  setOrderType,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
