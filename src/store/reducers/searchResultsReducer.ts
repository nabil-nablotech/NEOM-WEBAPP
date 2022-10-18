import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResultsState2, tabNameProps } from "../../types/SearchResultsTabsProps";
import { DashboardResponse } from "../../types/dashboard";
import { Place, Meta } from "../../types/Place";
import { Event } from "../../types/Event";

const initialState: SearchResultsState2 = {
  selectedCardIndex: 0,
  totalCounts: null,
  searchText: "",
  places: [],
  events: [],
  library: [],
  media: [],
  placeMetaData: null,
  eventMetaData: null,
  libararyMetaData: null,
  mediaMetaData: null,
  activeTab: '',
  newItemWindowOpen: false
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
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setPlaces: (state, action: PayloadAction<Place[]>) => {
      state.places = action.payload;
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    setLibrary: (state, action: PayloadAction<Event[]>) => {
      state.library = action.payload;
    },
    setMedia: (state, action: PayloadAction<Event[]>) => {
      state.media = action.payload;
    },
    setPlaceMetaData: (state, action: PayloadAction<Meta>) => {
      state.placeMetaData = action.payload;
    },
    setEventMetaData: (state, action: PayloadAction<Meta>) => {
      state.eventMetaData = action.payload;
    },
    setLibraryMetaData: (state, action: PayloadAction<Meta>) => {
      state.libararyMetaData = action.payload;
    },
    setMediaMetaData: (state, action: PayloadAction<Meta>) => {
      state.mediaMetaData = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<tabNameProps>) => {
      state.activeTab = action.payload;
    },
    toggleNewItemWindow: (state, action: PayloadAction<boolean>) => {
      state.newItemWindowOpen = action.payload;
    },
  },
});

export const {
  setSelectedCardIndex,
  setTotalCounts,
  setSearchText,
  setPlaces,
  setEvents,
  setLibrary,
  setMedia,
  setPlaceMetaData,
  setEventMetaData,
  setLibraryMetaData,
  setMediaMetaData,
  setActiveTab,
  toggleNewItemWindow
} = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
