import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Options } from "../../types/RefinedSeachTypes";

export const initialValue = {
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
  keywords: [],
  recordingTeam: '',
  uniqueId: '',
  fieldNarrative: '',
  visitUIPath: '',
  siteDescription: '',
  assessmentTypeOther: '',
  visitNumber: null,
  asset_config_id: null,
  latitude: null,
  longitude: null,
  visitDate: new Date(),
}

export type AddEventState = {
    visitDate: Date
    uniqueId: string
    recordingTeam: string
    fieldNarrative: string
    visitUIPath: string
    visitNumber: Number | null
    asset_config_id: Number | null
    siteDescription: string
    siteType: string[]
    researchValue: string[]
    tourismValue: string[]
    stateOfConservation: string[]
    recommendation: string[]
    risk: string[]
    period: string[]
    latitude: Number | null
    longitude: Number | null
    artifacts: string[]
    keywords: string[]
    assessmentType: string[]
    assessmentTypeOther: string
}

const initialState: {event: AddEventState} = {
  event: initialValue
}

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventData: (state, action: PayloadAction<AddEventState>) => {
      state.event = action.payload
    } 
  },
});

export const {
  setEventData
} = eventSlice.actions;

export default eventSlice.reducer;
