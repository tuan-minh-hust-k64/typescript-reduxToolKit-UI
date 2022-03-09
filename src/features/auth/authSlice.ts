import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IUser } from 'model';

export interface AuthState {
  isLoggedIn: boolean;
  logging: boolean;
  currentUser?: IUser;
}

export interface AuthPayload {
  email: string;
  password: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<IUser>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
    },
    loginFailure(state, action: PayloadAction<String>) {
      state.logging = false;
      state.isLoggedIn = false;
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
      state.logging = false;
    },
  },
});

export const selectIsLoggedIn = (state: RootState) => state.authReducer.isLoggedIn;
export const selectLogging = (state: RootState) => state.authReducer.logging;
export const selectCurrentUser = (state: RootState) => state.authReducer.currentUser;

export const actionAuth = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
