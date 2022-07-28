import { configureStore } from "@reduxjs/toolkit";
import dateReducer from './redux/selectedDateSlice'
import calenderReducer from './redux/remindersSlice'

export const store = configureStore({
    reducer: {
        date: dateReducer,
        calender: calenderReducer
    }
})