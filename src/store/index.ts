import { configureStore } from '@reduxjs/toolkit';
import loginReducers  from './reducers/loginReducers';
export const store = configureStore({
    reducer: {
      login: loginReducers,
    },
  });

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
