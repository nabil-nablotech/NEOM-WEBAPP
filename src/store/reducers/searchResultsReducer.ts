import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InventoryAssociationType, SearchResultsState2, tabNameProps } from "../../types/SearchResultsTabsProps";
import { DashboardResponse } from "../../types/dashboard";
import { Place, Meta } from "../../types/Place";
import { Event } from "../../types/Event";
import { Media } from "../../types/Media";

const initialState: SearchResultsState2 = {
  selectedCardIndex: 0,
  searchApply: false,
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
  newItemWindowOpen: false,
  showAddSuccess: false,
  activePlaceItem: null,
  activePlaceItemIndex: 0,
  activeEventItem: null,
  activeEventItemIndex: 0,
  activeMediaItem: null,
  activeMediaItemIndex: 0,
  isOpenGalleryView: false,
  addNewItemWindowType: null,
  isAssociationsStepOpen: false,
  associatedPlaces: [],
  associatedEvents: [],
  addItemWindowMinimized: null
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
    setLibrary: (state, action: PayloadAction<Media[]>) => {
      state.library = action.payload;
    },
    setMedia: (state, action: PayloadAction<Media[]>) => {
      state.media = action.payload;
    },
    setPlaceMetaData: (state, action: PayloadAction<Meta | null>) => {
      state.placeMetaData = action.payload;
    },
    setEventMetaData: (state, action: PayloadAction<Meta | null>) => {
      state.eventMetaData = action.payload;
    },
    setLibraryMetaData: (state, action: PayloadAction<Meta | null>) => {
      state.libararyMetaData = action.payload;
    },
    setMediaMetaData: (state, action: PayloadAction<Meta | null>) => {
      state.mediaMetaData = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<tabNameProps>) => {
      state.activeTab = action.payload;
    },
    toggleNewItemWindow: (state, action: PayloadAction<boolean>) => {
      state.newItemWindowOpen = action.payload;
    },
    toggleShowAddSuccess: (state, action: PayloadAction<boolean>) => {
      state.showAddSuccess = action.payload;
    },
    setActiveMediaItem: (state, action: PayloadAction<Object | any>) => {
      state.activeMediaItem = action.payload;
    },
    setActiveMediaItemIndex: (state, action: PayloadAction<number>) => {
      state.activeMediaItemIndex = action.payload;
    },
    setActiveEventItem: (state, action: PayloadAction<Object | any>) => {
      state.activeEventItem = action.payload;
    },
    setActiveEventItemIndex: (state, action: PayloadAction<number>) => {
      state.activeEventItemIndex = action.payload;
    },
    setActivePlaceItem: (state, action: PayloadAction<Object | any>) => {
      state.activePlaceItem = action.payload;
    },
    setActivePlaceItemIndex: (state, action: PayloadAction<number>) => {
      state.activePlaceItemIndex = action.payload;
    },
    toggleGalleryView: (state, action: PayloadAction<boolean>) => {
      state.isOpenGalleryView = action.payload;
    },
    setSearchApply: (state, action: PayloadAction<boolean>) => {
      state.searchApply = action.payload;
    },
    setAddNewItemWindowType: (state, action: PayloadAction<tabNameProps | null>) => {
      state.addNewItemWindowType = action.payload;
    },
    toggleAssociationsStepOpen: (state, action: PayloadAction<boolean>) => {
      state.isAssociationsStepOpen = action.payload;
    },
    modifyAssociatedPlaces: (state, action: PayloadAction<{newItem: InventoryAssociationType | null, removeId: number | null}>) => {

      // remove flow
      if (
        !action.payload.newItem &&
        (action.payload.removeId || action.payload.removeId === 0)
      ) {
        state.associatedPlaces = state.associatedPlaces.filter(item => item.id !== action.payload.removeId)
      }

      // add flow
      if (
        action.payload.newItem &&
        !action.payload.removeId
        &&
        (
          state.associatedPlaces.every(item => item.id !== action.payload.newItem?.id)
        )
      ) {
        state.associatedPlaces = [...state.associatedPlaces, action.payload.newItem];
      }
    },
    modifyAssociatedEvents: (state, action: PayloadAction<{newItem: InventoryAssociationType | null, removeId: number | null}>) => {

      // remove flow
      if (
        !action.payload.newItem &&
        (action.payload.removeId || action.payload.removeId === 0)
      ) {
        state.associatedEvents = state.associatedEvents.filter(item => item.id !== action.payload.removeId)
      }

      // add flow
      if (
        action.payload.newItem &&
        !action.payload.removeId
        &&
        (
          state.associatedEvents.every(item => item.id !== action.payload.newItem?.id)
        )
      ) {
        state.associatedEvents = [...state.associatedEvents, action.payload.newItem];
      }
    },
    toggleAddItemWindowMinimized: (state, action: PayloadAction<boolean | null>) => {
      state.addItemWindowMinimized = action.payload;
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
  toggleNewItemWindow,
  toggleShowAddSuccess,
  setActivePlaceItem,
  setActivePlaceItemIndex,
  setActiveEventItem,
  setActiveEventItemIndex,
  setActiveMediaItem,
  setActiveMediaItemIndex,
  toggleGalleryView,
  setSearchApply,
  setAddNewItemWindowType,
  toggleAssociationsStepOpen,
  modifyAssociatedPlaces,
  modifyAssociatedEvents,
  toggleAddItemWindowMinimized
} = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
