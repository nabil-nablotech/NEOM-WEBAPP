import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventApi, VisitIdProps } from "../../types/Event";
import { Place } from "../../types/Place";
import { Options } from "../../types/RefinedSeachTypes";

export const initialValue = {
  stateOfConservation: [] || undefined,
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
  recordingTeam: "",
  uniqueId: "",
  fieldNarrative: "",
  visitUIPath: "",
  siteDescription: "",
  assessmentTypeOther: "",
  visitNumber: '',
  asset_config_id: null,
  latitude: undefined,
  longitude: undefined,
  visitDate: undefined,
  createdAt: "",
  updatedAt: "",
  deleted: false,
  id: undefined
};

export type AddEventState = {
  id: number;
  visitDate?: Date;
  uniqueId: string;
  recordingTeam?: string;
  fieldNarrative?: string;
  visitUIPath?: string;
  visitNumber: Number | null;
  asset_config_id?: Number | null;
  siteDescription?: string;
  siteType?: string[];
  researchValue?: string;
  tourismValue?: string;
  stateOfConservation?: string;
  recommendation?: string;
  risk?: string;
  period?: string[];
  latitude?: Number | null;
  longitude?: Number | null;
  artifacts?: string;
  keywords?: string;
  assessmentType?: string;
  assessmentTypeOther?: string;
};

const initialState: { event: EventApi; places: Place[] | [], edit: boolean } = {
  event: initialValue,
  places: [],
  edit: false
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventData: (state, action: PayloadAction<EventApi>) => {
      state.event = action.payload;
    },
    setPlaces: (state, action: PayloadAction<Place[] | []>) => {
      state.places = action.payload;
    },
    setEventEdit: (state,action: PayloadAction<boolean>) => {
      state.edit = action.payload;
    }
  },
});

export const { setEventData, setPlaces, setEventEdit } = eventSlice.actions;

export default eventSlice.reducer;
