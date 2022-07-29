import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "./redux/selectedDateSlice";
import calenderReducer from "./redux/remindersSlice";
import { localStorageMiddleware, reHydrateStore } from "./util/localStorage";

export const store = configureStore({
  reducer: {
    selected: dateReducer,
    calender: calenderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState: reHydrateStore(),
});
