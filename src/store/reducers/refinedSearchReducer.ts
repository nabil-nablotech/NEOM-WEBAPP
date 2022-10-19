import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Options } from "../../types/RefinedSeachTypes";
export type SelectedValue = {
  stateOfConservation: string;
  period: string;
  recommendation: string;
  researchValue: string;
  tourismValue: string;
  risk: string;
  assessmentType: string;
  artifacts: string;
  location: string;
}
const initialSelectedValue = {
  stateOfConservation: '',
  period: '',
  recommendation: '',
  researchValue: '',
  tourismValue: '',
  risk: '',
  assessmentType: '',
  artifacts: '',
  location: '',
}

export type RefinedSearchState = {
  options: Options | null; 
  selectedValue: SelectedValue
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
    setSelectedValue: (state, action: PayloadAction<SelectedValue>) => {
      state.selectedValue = action.payload;
    },
  },
});

export const {
  setOptions,
  setSelectedValue
} = refinedSearchSlice.actions;

export default refinedSearchSlice.reducer;
