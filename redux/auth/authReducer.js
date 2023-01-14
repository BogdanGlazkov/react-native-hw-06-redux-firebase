import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: "",
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      email: payload.email,
    }),
  },
});
