import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addItemProgressPayload, addItemProgressStateType, DeletePayloadType, InventoryAssociationType, InventoryAssociationType_Event, SearchResultsState2, tabNameProps, ToggledStateTypes } from "../../types/SearchResultsTabsProps";
import { DashboardResponse } from "../../types/dashboard";
import { Place, Meta } from "../../types/Place";
import { Event } from "../../types/Event";
import { Media } from "../../types/Media";
import { DeleteRecordReduxPayload, DeleteUserReduxPayload } from "../../types/User";

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
  toggledStates:{
    states: null,
    tabName: 'Places'
  },
  newItemWindowOpen: false,
  showAddSuccess: false,
  showEditSuccess: false,
  activePlaceItem: null,
  activePlaceItemIndex: 0,
  activeEventItem: null,
  activeEventItemIndex: 0,
  activeMediaItem: null,
  activeMediaItemIndex: 0,
  activeLibraryItem: null,
  activeLibraryItemIndex: 0,
  isOpenGalleryView: false,
  addNewItemWindowType: null,
  isAssociationsStepOpen: false,
  associatedPlaces: [],
  associatedEvents: [],
  addItemWindowMinimized: null,
  addItemProgressState: null,
  isAssociationsIconsDisabled: false,
  isEditConfirmationWindowOpen: false,
  confirmOpenEdit : false,
  isDeleteConfirmationWindowOpen: {
    flag: false,
    isAssociatedToPlacesOrEvents: false,
  },
  itemAboutToDelete: null,
  confirmDelete : false,
  editPayload: null,
  shallUpdateKeywords: false,
  deleteItemType: null,
  deleteItemSuccess: false,
  isDeleteUserWindowOpen: {
    flag: false,
    mailId: '',
  },
  deleteUserSuccess: false,
  deletePayload: null,
  history: [],
  isLogoutConfirmationWindowOpen: false,

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
    setToggledStates: (state, action: PayloadAction<ToggledStateTypes>) => {
      state.toggledStates = action.payload;
    },
    toggleNewItemWindow: (state, action: PayloadAction<boolean>) => {
      state.newItemWindowOpen = action.payload;
    },
    toggleShowAddSuccess: (state, action: PayloadAction<boolean>) => {
      state.showAddSuccess = action.payload;

      if(action.payload) {
        state.shallUpdateKeywords = true
      }

      if(action.payload) {
        state.activePlaceItem = null
        state.activePlaceItemIndex = 0
        state.activeEventItem = null
        state.activeEventItemIndex = 0
        state.activeMediaItem = null
        state.activeMediaItemIndex = 0
        state.activeLibraryItem = null
        state.activeLibraryItemIndex = 0
        // state.associatedPlaces=[]
        // state.associatedEvents=[]
      }
    },
    toggleShowEditSuccess: (state, action: PayloadAction<boolean>) => {
      state.showEditSuccess = action.payload;

      if(action.payload) {
        state.shallUpdateKeywords = true
      }

      if(action.payload) {
        state.activePlaceItem = null
        state.activePlaceItemIndex = 0
        state.activeEventItem = null
        state.activeEventItemIndex = 0
        state.activeMediaItem = null
        state.activeMediaItemIndex = 0
        state.activeLibraryItem = null
        state.activeLibraryItemIndex = 0
        state.associatedPlaces=[]
        state.associatedEvents=[]
      }
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
    setActiveLibraryItem: (state, action: PayloadAction<Object | any>) => {
      state.activeLibraryItem = action.payload;
    },
    setActiveLibraryItemIndex: (state, action: PayloadAction<number>) => {
      state.activeLibraryItemIndex = action.payload;
    },
    toggleGalleryView: (state, action: PayloadAction<boolean>) => {
      state.isOpenGalleryView = action.payload;
    },
    setSearchApply: (state, action: PayloadAction<boolean>) => {
      state.searchApply = action.payload;
    },
    setAddNewItemWindowType: (state, action: PayloadAction<tabNameProps | null>) => {
      state.addNewItemWindowType = action.payload;
      if(!action.payload) {
        state.isAssociationsStepOpen = false
        state.isAssociationsIconsDisabled = false
      }
    },
    toggleAssociationsStepOpen: (state, action: PayloadAction<boolean>) => {
      state.isAssociationsStepOpen = action.payload;
    },
    toggleAssociationsIconDisabled: (state, action: PayloadAction<boolean>) => {
      state.isAssociationsIconsDisabled = action.payload;
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
    modifyAssociatedEvents: (state, action: PayloadAction<{newItem: InventoryAssociationType_Event | null, removeId: string | null}>) => {

      // remove flow
      if (
        !action.payload.newItem &&
        (action.payload.removeId)
      ) {
        state.associatedEvents = state.associatedEvents.filter(item => Number(item.id) !== Number(action.payload.removeId))
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
    resetMediaAssociation: (state, action: PayloadAction<null>) => {
      state.associatedEvents=[];
      state.associatedPlaces=[];
    },
    setDefaultMediaAssociation: (state, action: PayloadAction<{events: InventoryAssociationType_Event[], places: InventoryAssociationType[]}>) => {
      state.associatedEvents=action.payload.events;
      state.associatedPlaces=action.payload.places;
    },
    toggleAddItemWindowMinimized: (state, action: PayloadAction<boolean | null>) => {
      state.addItemWindowMinimized = action.payload;
    },
    storeAddItemProgressState: (state, action: PayloadAction<addItemProgressPayload | null>) => {
      state.addItemProgressState = action.payload;
    },
    toggleEditConfirmationWindowOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditConfirmationWindowOpen = action.payload;
    },
    toggleConfirmOpenEdit: (state, action: PayloadAction<boolean>) => {
      state.confirmOpenEdit = action.payload;

      if(action.payload && state.addItemWindowMinimized) {
        state.addItemWindowMinimized = false
      }
    },
    setEditPayload: (state, action: PayloadAction<any>) => {
      state.editPayload = action.payload;
    },
    toggleDeleteConfirmationWindowOpen: (state, action: PayloadAction<DeleteRecordReduxPayload>) => {
      state.isDeleteConfirmationWindowOpen = action.payload;
    },
    toggleConfirmDelete: (state, action: PayloadAction<boolean>) => {
      state.confirmDelete = action.payload;

      if(action.payload && state.addItemWindowMinimized) {
        state.addItemWindowMinimized = false
      }
    },
    toggleShallUpdateKeywords: (state, action: PayloadAction<boolean>) => {
      state.shallUpdateKeywords = action.payload;
    },
    toggleDeleteItemSuccess: (state, action: PayloadAction<boolean>) => {
      state.deleteItemSuccess = action.payload;
    },
    setDeleteItemType: (state, action: PayloadAction<tabNameProps | null>) => {
      state.deleteItemType = action.payload;
    },
    toggleDeleteUserWindowOpen: (state, action: PayloadAction<DeleteUserReduxPayload>) => {
      state.isDeleteUserWindowOpen = action.payload;
    },
    toggleDeleteUserSuccess: (state, action: PayloadAction<boolean>) => {
      state.deleteUserSuccess = action.payload;
    },
    setDeletePayload: (state, action: PayloadAction<DeletePayloadType>) => {
      state.deletePayload = action.payload;
    },
    setHistoryRedux: (state, action: PayloadAction<Array<string> | []>) => {
      state.history = action.payload;
    },
    toggleLogoutConfirmationWindowOpen: (state, action: PayloadAction<boolean>) => {
      state.isLogoutConfirmationWindowOpen = action.payload;
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
  setToggledStates,
  toggleNewItemWindow,
  toggleShowAddSuccess,
  toggleShowEditSuccess,
  setActivePlaceItem,
  setActivePlaceItemIndex,
  setActiveEventItem,
  setActiveEventItemIndex,
  setActiveMediaItem,
  setActiveMediaItemIndex,
  setActiveLibraryItem,
  setActiveLibraryItemIndex,
  toggleGalleryView,
  setSearchApply,
  setAddNewItemWindowType,
  toggleAssociationsStepOpen,
  modifyAssociatedPlaces,
  modifyAssociatedEvents,
  resetMediaAssociation,
  setDefaultMediaAssociation,
  toggleAddItemWindowMinimized,
  storeAddItemProgressState,
  toggleAssociationsIconDisabled,
  toggleEditConfirmationWindowOpen,
  toggleConfirmOpenEdit,
  setEditPayload,
  toggleDeleteConfirmationWindowOpen,
  toggleConfirmDelete,
  toggleShallUpdateKeywords,
  toggleDeleteItemSuccess,
  setDeleteItemType,
  toggleDeleteUserWindowOpen,
  toggleDeleteUserSuccess,
  setDeletePayload,
  setHistoryRedux,
  toggleLogoutConfirmationWindowOpen
} = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
