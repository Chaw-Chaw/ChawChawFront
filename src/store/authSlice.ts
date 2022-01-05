import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthInitialStateProps,
  LoginResponseBody,
  UserPropertys,
} from "../types/account";
import { avoidLocalStorageUndefined, saveSecureLocalStorage } from "../utils";

const initialState: AuthInitialStateProps = {
  user: avoidLocalStorageUndefined("user", {}),
  isLogin: avoidLocalStorageUndefined("accessToken", false),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<LoginResponseBody>) {
      const { token, profile, blockIds } = action.payload;
      const accessToken = "Bearer " + token.accessToken;
      const expireAtAccessToken = Date.now() + token.expiresIn;

      saveSecureLocalStorage("expireAtAccessToken", expireAtAccessToken);
      saveSecureLocalStorage("accessToken", accessToken);

      if (action.payload.profile) {
        const newData: UserPropertys = {
          ...profile,
          blockIds,
        };
        const newUser = { ...state.user, ...newData };
        state.user = newUser;
        saveSecureLocalStorage("user", newUser);
      }
      state.isLogin = true;
    },
    updateUser(state, action: PayloadAction<UserPropertys>) {
      const newUser = { ...state.user, ...action.payload };
      state.user = newUser;
      saveSecureLocalStorage("user", newUser);
    },
    initUser(state) {
      state.user = {};
      state.isLogin = false;
      window.localStorage.removeItem("accessToken");
      window.localStorage.removeItem("expireAtAccessToken");
      window.localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
