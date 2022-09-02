import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    signIn(state, action) {
      const currentUser = action.payload;

      state[currentUser].isAuth = true;
    },

    logOut(state, action) {
      const currentUser = action.payload;

      state[currentUser].isAuth = false;
    },

    addUser(state, action) {
      const newUser = action.payload.email;

      state[newUser] = action.payload;
    },
  },
});

export const {
  signIn,
  logOut,
  addUser,
} = userSlice.actions;

export default userSlice.reducer;
