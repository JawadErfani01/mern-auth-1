import { createSlice } from "@reduxjs/toolkit";

// Check if userInfo exists in localStorage
const userInfoFromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));

// Set initialState accordingly
const initialState = {
  userInfo: userInfoFromLocalStorage || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleUserInfo: (state, action) => {
      const userInfo = action.payload;
      // Update Redux state
      state.userInfo = userInfo;
      // Update localStorage
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    logout: (state, action) => {
      // Clear both Redux state and localStorage
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { handleUserInfo, logout } = authSlice.actions;

export default authSlice.reducer;
