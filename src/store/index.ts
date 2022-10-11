import { configureStore } from '@reduxjs/toolkit';
import loginReducers  from './reducers/loginReducers';
import searchResultsReducer from './reducers/searchResultsReducer';
export const store = configureStore({
    reducer: {
      login: loginReducers,
      searchResults: searchResultsReducer,
    },
  });

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
