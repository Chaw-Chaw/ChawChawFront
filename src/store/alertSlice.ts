import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Router from "next/router";
import store from ".";
import {
  LOGIN_PAGE_URL,
  MAIN_PAGE,
  MANAGE_MAIN_PAGE_URL,
  POST_PAGE_URL,
  SIGNUP_PAGE_URL,
  SIGNUP_WEBMAIL_AUTH_PAGE_URL,
  CONFIRM_DELETE_USER,
  CONFIRM_DISPATCH_SIGNUP,
  CONFIRM_INIT_LOGOUT,
  CONFIRM_PUSH_LOGINPAGE,
  CONFIRM_PUSH_MAIN_PAGE,
  CONFIRM_PUSH_MANAGE_MAINPAGE,
  CONFIRM_PUSH_POSTPAGE,
  CONFIRM_PUSH_SIGNUP,
  CONFIRM_PUSH_SIGNUP_WEBMAIL,
  CONFIRM_VOID,
} from "../constants";
import { asyncErrorHandle } from "./actions/alertActions";
import { signup } from "./actions/authActions";
import { deleteUser } from "./actions/manageActions";

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

export default alertSlice.reducer;
export const alertActions = alertSlice.actions;

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
      case CONFIRM_PUSH_MAIN_PAGE:
        Router.push(MAIN_PAGE);
        break;
      case CONFIRM_PUSH_MANAGE_MAINPAGE:
        Router.push(MANAGE_MAIN_PAGE_URL);
        break;
      case CONFIRM_DELETE_USER:
        try {
          await thunkAPI.dispatch(deleteUser());
        } catch (error) {
          thunkAPI.dispatch(asyncErrorHandle(error));
        }
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
      case CONFIRM_INIT_LOGOUT:
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("expireAtAccessToken");
        window.localStorage.removeItem("user");
        window.localStorage.href = LOGIN_PAGE_URL;
        break;
      default:
        break;
    }
  }
);
