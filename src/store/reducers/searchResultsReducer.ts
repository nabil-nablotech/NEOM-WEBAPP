import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResultsState2 } from "../../types/SearchResultsTabsProps";
import { DashboardResponse } from '../../types/dashboard';

const initialState: SearchResultsState2 = {
  selectedCardIndex: 0,
  totalCounts: null
};

export const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    setSelectedCardIndex: (state, action: PayloadAction<number>) => {
      state.selectedCardIndex = action.payload;
    },
    setTotalCounts: (state, action: PayloadAction<DashboardResponse>) => {
      state.totalCounts = action.payload;
    }
  },
});

export const { setSelectedCardIndex, setTotalCounts } = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
