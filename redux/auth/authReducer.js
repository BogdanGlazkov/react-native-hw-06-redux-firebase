import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  login: "",
  email: "",
  avatarUrl: "",
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      email: payload.email,
      avatarUrl: payload.avatarUrl,
    }),
    updateAvatar: (state, { payload }) => ({
      ...state,
      avatarUrl: payload.avatarUrl,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authLogOut: () => initialState,
  },
});
