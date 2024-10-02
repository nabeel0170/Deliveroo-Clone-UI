import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserStateType {
  LoggedIn: boolean;
  token: string | null;
  expiry: number | null;
}

export const userStateInitialState: UserStateType = {
  LoggedIn: false,
  token: null,
  expiry: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userStateInitialState,
  reducers: {
    setLoggedIn(state, action: PayloadAction<string>) {
      state.LoggedIn = true;
      state.token = action.payload; // Store the JWT token
      state.expiry = Date.now() + 24 * 60 * 60 * 1000; // Token expiration in 24 hours
    },
    setLoggedOut(state) {
      state.LoggedIn = false;
      state.token = null;
      state.expiry = null;
    },
  },
});

export const { setLoggedIn, setLoggedOut } = userSlice.actions;
export default userSlice.reducer;
