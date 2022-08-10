import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { SortTypeType } from "./filterSlice";

type FetchPizzasArgs = {
  category: string;
  search: string;
  limit: number;
  orderType: string;
  sortType: SortTypeType;
  currentPage: number;
};

type Pizza = {
  category: number;
  rating: number;
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

type DataType = { items: Pizza[]; count: number };

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: Pizza[];
  limit: number;
  pagesCount: number;
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  limit: 8,
  pagesCount: 1,
  status: Status.LOADING, // loading | success | error
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: FetchPizzasArgs) => {
    const { category, search, limit, orderType, sortType, currentPage } =
      params;
    const { data } = await axios.get<DataType>(
      `https://62ea84cfad295463258e96ec.mockapi.io/items?page=${currentPage}&limit=${limit}&${category}&sortBy=${sortType.sortProperty}&order=${orderType}${search}`
    );
    return data;
  }
);

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.pagesCount = Math.ceil(action.payload.count / state.limit);
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
