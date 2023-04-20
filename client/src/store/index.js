import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "./dateSlice";
import msgReducer from "./msgSlice";

export const store = configureStore({
  reducer: {
    date: dateReducer,
    messages: msgReducer,
  },
});
