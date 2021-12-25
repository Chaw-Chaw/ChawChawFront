import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Router from "next/router";
import store from ".";
import {
  LOGIN_PAGE_URL,
  POST_PAGE_URL,
  SIGNUP_PAGE_URL,
  SIGNUP_WEBMAIL_AUTH_PAGE_URL,
} from "../constants";
import {
  CONFIRM_DISPATCH_SIGNUP,
  CONFIRM_PUSH_LOGINPAGE,
  CONFIRM_PUSH_POSTPAGE,
  CONFIRM_PUSH_SIGNUP,
  CONFIRM_PUSH_SIGNUP_WEBMAIL,
  CONFIRM_VOID,
} from "../constants/alert";
import { authActions, signup } from "./authSlice";

interface AlertType {
  name: "Error" | "Warning" | "Success" | "Info" | string;
  message: string;
  type?: "select" | "confirm";
  confirmFuncName?: string;
}

interface AlertStateType extends AlertType {
  id: number;
  type: "select" | "confirm";
  confirmFuncName: string;
}

const initialState: {
  alertList: AlertStateType[];
} = {
  alertList: [],
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    updateAlert(state, action: PayloadAction<AlertType>) {
      const newAlert = {
        name: action.payload.name,
        message: action.payload.message,
        id: state.alertList.length,
        type: action.payload.type || "confirm",
        confirmFuncName: action.payload.confirmFuncName || "",
      };
      state.alertList.push(newAlert);
    },
    initAlertList(state) {
      state.alertList = [];
    },
    removeAlert(state, action: PayloadAction<number>) {
      state.alertList = state.alertList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(updateAlert.fulfilled, (state, action) => {});
  },
});

export const confirmFunc = createAsyncThunk(
  "alert/confirmFunc",
  async (confirmFuncName: string, thunkAPI) => {
    switch (confirmFuncName) {
      case CONFIRM_VOID:
        break;
      case CONFIRM_PUSH_LOGINPAGE:
        Router.push(LOGIN_PAGE_URL);
        break;
      case CONFIRM_PUSH_POSTPAGE:
        Router.push(POST_PAGE_URL);
        break;
      case CONFIRM_PUSH_SIGNUP:
        Router.push(SIGNUP_PAGE_URL);
        break;
      case CONFIRM_PUSH_SIGNUP_WEBMAIL:
        Router.push(SIGNUP_WEBMAIL_AUTH_PAGE_URL);
        break;
      case CONFIRM_DISPATCH_SIGNUP:
        const user = store.getState().auth.user;
        if (
          user.email &&
          user.name &&
          user.web_email &&
          user.school &&
          user.imageUrl &&
          user.provider
        ) {
          thunkAPI.dispatch(
            signup({
              email: user.email,
              name: user.name,
              web_email: user.web_email,
              school: user.school,
              imageUrl: user.imageUrl,
              provider: user.provider,
            })
          );
        }
        break;
      default:
        break;
    }
  }
);

export default alertSlice.reducer;
export const alertActions = alertSlice.actions;
