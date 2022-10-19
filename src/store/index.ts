import { configureStore } from '@reduxjs/toolkit';
import loginReducers  from './reducers/loginReducers';
import searchResultsReducer from './reducers/searchResultsReducer';
import refinedSearchReducer from './reducers/refinedSearchReducer';
export const store = configureStore({
    reducer: {
      login: loginReducers,
      searchResults: searchResultsReducer,
      refinedSearch: refinedSearchReducer
    },
  });

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
