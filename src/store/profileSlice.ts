import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INIT_USERINFO } from "../constants";
import { ManageUserInfoType } from "../types/profile";

const initialState = {
  userInfo: INIT_USERINFO,
  userSchool: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateUserInfo(state, action: PayloadAction<ManageUserInfoType>) {
      state.userInfo = action.payload;
    },
    updateUserSchool(state, action: PayloadAction<string>) {
      state.userSchool = action.payload;
    },
    updateUserContent(state, action: PayloadAction<string>) {
      state.userInfo.content = action.payload;
    },
    updateUserCountry(state, action: PayloadAction<string[]>) {
      state.userInfo.country = action.payload;
    },
    updateUserLanguage(state, action: PayloadAction<string[]>) {
      state.userInfo.language = action.payload;
    },
    updateUserHopeLanguage(state, action: PayloadAction<string[]>) {
      state.userInfo.hopeLanguage = action.payload;
    },
  },
});

export default profileSlice.reducer;
export const profileActions = profileSlice.actions;
