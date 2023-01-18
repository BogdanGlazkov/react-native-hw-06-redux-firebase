import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
  usersPosts: [],
  comments: [],
  uploadedPhoto: "",
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getAllPosts: (state, { payload }) => ({
      ...state,
      allPosts: payload.allPosts,
    }),
    getUsersPosts: (state, { payload }) => ({
      ...state,
      usersPosts: payload.usersPosts,
    }),
    getComments: (state, { payload }) => ({
      ...state,
      comments: payload.sortedComments,
    }),
    getPhoto: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    postsLogOut: () => initialState,
  },
});
