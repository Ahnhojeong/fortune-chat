import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userMessages: [],
  assistantMessages: [],
  allMessages: [],
  status: "idle",
  error: "",
};

const BASE_URL = "http://localhost:8080";

export const postMessages = createAsyncThunk(
  "messages/postMessages",
  async (initialPost) => {
    console.log("postMessages initialPost --> ", initialPost);
    const { myDateTime, userMessages, assistantMessages } = initialPost;
    try {
      const response = await axios.post(`${BASE_URL}`, initialPost);
      if (response?.status === 200) return response.data;
      return `${response.status} : ${response.statusText}`;
    } catch (error) {
      return error.message;
    }
  }
);

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
  extraReducers(builder) {
    builder
      .addCase(postMessages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assistantMessages.push(action.payload.assistant);
        state.allMessages.push(action.payload.assistant);
      })
      .addCase(postMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUserMessages, setAssistantMessages, setAllMessages } =
  msgSlice.actions;
export const getMessagesError = (state) => state.messages.error;
export const getMessagesStatus = (state) => state.messages.status;

export default msgSlice.reducer;
