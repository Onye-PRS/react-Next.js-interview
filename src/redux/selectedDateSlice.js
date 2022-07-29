import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    date: null,
    type: null
}

const dateReducer = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    setSelectedDate(state, action) {
      state.date = action.payload.date
      state.type = action.payload.type
    },
    clearSelectedDate(state, action) {
      state.date = null
      state.type = null
    },
    
  }
})

export const { setSelectedDate, clearSelectedDate } = dateReducer.actions

export default dateReducer.reducer