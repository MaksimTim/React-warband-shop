import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, search, limit, orderType, sortType, currentPage } =
      params;
    const { data } = await axios.get(
      `https://62ea84cfad295463258e96ec.mockapi.io/items?page=${currentPage}&limit=${limit}&${category}&sortBy=${sortType.sortProperty}&order=${orderType}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  limit: 8,
  pagesCount: 1,
  status: "loading", // loading | success | error
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload.items;
      state.pagesCount = Math.ceil(action.payload.count / state.limit);
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
