import {createSlice} from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  updateUserThunk
} from "../../services/user/user-thunks";

const userReducer = createSlice({
  name: "user",
  initialState: {
    currentUser: null
  },
  extraReducers: {
    [loginThunk.fulfilled]: (state, {payload}) => {
      state.currentUser = payload;
    },
    [logoutThunk.fulfilled]: (state, {payload}) => {
      state.currentUser = null;
    },
    [updateUserThunk.fulfilled]: (state, {payload}) => {
      state.currentUser = payload;
    }
  }
})

export default userReducer.reducer;