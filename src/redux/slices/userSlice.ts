import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userStateType {
  LoggedIn: boolean;
}
export const userStateInitialState: userStateType = {
  LoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userStateInitialState,
  reducers: {
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.LoggedIn = action.payload;
    },
  },
});
export const { setLoggedIn } = userSlice.actions;
export default userSlice.reducer;
