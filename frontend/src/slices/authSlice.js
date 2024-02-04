import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state, action) => {
      state.userInfo = null;
    },
  },
});

export const { handleUserInfo, logout } = authSlice.actions;

export default authSlice.reducer;
