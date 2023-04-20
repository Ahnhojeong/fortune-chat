import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userMessages: [],
  assistantMessages: [],
  allMessages: [],
};

export const msgSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setUserMessages: (state, action) => {
      state.userMessages.push(action.payload);
    },
    setAssistantMessages: (state, action) => {
      state.assistantMessages.push(action.payload);
    },
    setAllMessages: (state, action) => {
      state.allMessages.push(action.payload);
    },
  },
});

export const { setUserMessages, setAssistantMessages, setAllMessages } = msgSlice.actions;

export default msgSlice.reducer;
