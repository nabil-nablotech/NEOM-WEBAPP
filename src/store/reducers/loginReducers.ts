import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface CounterState {
  data: User | null
}

const initialState: CounterState = {
  data: null,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload
    }
  },
})

export const { setUser } = loginSlice.actions

export default loginSlice.reducer
