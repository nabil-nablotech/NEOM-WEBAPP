import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResultsState2 } from '../../types/SearchResultsTabsProps';


const initialState: SearchResultsState2 = {
    selectedCardIndex: 0
}

export const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState,
    reducers: {
        setSelectedCardIndex: (state, action: PayloadAction<number >) => {
            state.selectedCardIndex = action.payload
        }
    },
})

export const { setSelectedCardIndex } = searchResultsSlice.actions

export default searchResultsSlice.reducer
