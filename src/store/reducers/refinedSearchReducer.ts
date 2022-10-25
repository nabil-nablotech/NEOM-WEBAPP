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
  siteType: [],
  latitude: '',
  longitude: '',
}

export type RefinedSearchState = {
  options: Options | null; 
  selectedValue: Options
}

const initialState: RefinedSearchState = {
  options: null,
  selectedValue: initialSelectedValue
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
  },
});

export const {
  setOptions,
  setSelectedValue
} = refinedSearchSlice.actions;

export default refinedSearchSlice.reducer;
