import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    reminders: {}
}

const calenderReducer = createSlice({
  name: 'calender',
  initialState,
  reducers: {
    createReminder(state, action) {
      state.reminders[action.payload.date] = action.payload
    },
    deleteReminder(state, action) {
      delete state.reminders[action.payload.date]
    },
    
  }
})

export const { createReminder, deleteReminder } = calenderReducer.actions

export default calenderReducer.reducer