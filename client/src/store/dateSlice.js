import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: {
    day: "",
    hour: "",
  },
};

export const dateSlice = createSlice({
  name: "dateInfo",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date.day = action.payload.day;
      state.date.hour = action.payload.hour;
    },
  },
});

export const { setDate } = dateSlice.actions;

// export const dates = (state) => state.dateSlice.date;

export default dateSlice.reducer;
