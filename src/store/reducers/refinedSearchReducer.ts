import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Options } from "../../types/RefinedSeachTypes";

export const initialSelectedValue = {
  stateOfConservation: [],
  period: [],
  recommendation: [],
  researchValue: [],
  tourismValue: [],
  risk: [],
  assessmentType: [],
  artifacts: [],
  actionType: [],
  siteType: [],
  latitude: '',
  longitude: '',
  startDate: undefined,
  endDate: undefined,
  keyWords: [],
  
}

export type RefinedSearchState = {
  options: Options | null; 
  selectedValue: Options,
  sort: string[] | [];
}

const initialState: RefinedSearchState = {
  options: null,
  selectedValue: initialSelectedValue,
  sort: [],
};

export const refinedSearchSlice = createSlice({
  name: "searchOptions",
  initialState,
  reducers: {
    setOptions: (state, action: PayloadAction<Options>) => {
      state.options = action.payload;
    },
    setSelectedValue: (state, action: PayloadAction<Options>) => {
      state.selectedValue = action.payload;
    },
    setSorting: (state, action: PayloadAction<string[]>) => {
      const filterSort = state.sort.filter(x => !x.includes(action.payload[0].split(':')[0]));
      state.sort = [...filterSort, ...action.payload];
    }
  },
});

export const {
  setOptions,
  setSelectedValue,
  setSorting
} = refinedSearchSlice.actions;

export default refinedSearchSlice.reducer;
