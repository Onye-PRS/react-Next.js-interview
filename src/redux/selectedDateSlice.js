import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selected: null
}

const dateReducer = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setSelectedDate(state, action) {
      state.selected = action.payload
    },
    clearSelectedDate(state, action) {
      state.selected = null
    },
    
  }
})

export const { setSelectedDate, clearSelectedDate } = dateReducer.actions

export default dateReducer.reducer