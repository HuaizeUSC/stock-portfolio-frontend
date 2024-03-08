import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: "",
    accessToken: "",
    refreshToken: "",
    username: "",
    message: "",
    messagetype: 0,
  },
  reducers: {
    setLoginData: (state, action) => {
      state.id = action.payload.id;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.username = action.payload.username;
      state.message = action.payload.message;
    },
    clearLoginData: (state) => {
      state.id = "";
      state.accessToken = "";
      state.refreshToken = "";
      state.username = "";
      state.message = "";
    },
    clearMessage: (state) => {
      state.message = "";
    },
    createMessage: (state, action) => {
      state.message = action.payload.message;
      state.messagetype = action.payload.messagetype;
    },
  },
});

export const { setLoginData, clearLoginData, clearMessage, createMessage } = authSlice.actions;

export default authSlice.reducer;
