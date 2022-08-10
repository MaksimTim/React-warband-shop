import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SearchSliceState {
  searchValue: string;
}

const initialState: SearchSliceState = {
  searchValue: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const selectorSearch = (state: RootState) => state.search;

export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
