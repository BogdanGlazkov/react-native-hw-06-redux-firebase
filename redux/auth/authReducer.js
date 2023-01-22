import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  login: "",
  email: "",
  photoURL: null,
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
      photoURL: payload.photoURL,
    }),
    updateAvatar: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    deleteAvatar: (state) => ({
      ...state,
      photoURL: null,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authLogOut: () => initialState,
  },
});
