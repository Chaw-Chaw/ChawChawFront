import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ADMIN_ROLE,
  CONFIRM_DUP_EMAIL_API_URL,
  CONFIRM_PUSH_LOGINPAGE,
  ERROR_CODES,
  INFO_ALERT,
  LOGIN_API_URL,
  LOGIN_PAGE_URL,
  LOGOUT_API_URL,
  MANAGE_MAIN_PAGE_URL,
  POST_PAGE_URL,
  SENDMAIL_API_URL,
  SIGNUP_API_URL,
  SUCCESS_ALERT,
  SUCCESS_EMAILCHECK_MSG,
  SUCCESS_SENDEMAIL_MSG,
  SUCCESS_SIGNUP_MSG,
  VERIFY_WEBMAIL_API_URL,
  UniversityList,
} from "../../constants";
import {
  FacebookLoginProps,
  KakaoLoginProps,
  LoginProps,
  LoginResponseBody,
  SignupProps,
  SignupPropsSocial,
} from "../../types/account";
import { DefaultResponseBody } from "../../types/response";
import { request } from "../../utils/request";
import { authActions } from "../authSlice";
import Router from "next/router";
import { alertActions } from "../alertSlice";
import { asyncErrorHandle } from "./alertActions";
import store from "..";

export const login = createAsyncThunk(
  "auth/login",
  async (body: LoginProps | KakaoLoginProps | FacebookLoginProps, thunkAPI) => {
    try {
      const {
        data: { data: user },
      } = await request.post<DefaultResponseBody<LoginResponseBody>>(
        LOGIN_API_URL,
        body
      );
      thunkAPI.dispatch(authActions.loginSuccess(user));
      if (user.profile.role === ADMIN_ROLE) {
        Router.push(MANAGE_MAIN_PAGE_URL);
        return;
      }
      Router.push(POST_PAGE_URL);
    } catch (error) {
      const status = error.response.data.status;
      const newUserData = error.response.data.data;
      if (status === "U402") {
        thunkAPI.dispatch(authActions.updateUser(newUserData));
        // 에러와 에러 함수를 전달해서 notification 컴포넌트를 띄워야 합니다.
        thunkAPI.dispatch(
          alertActions.updateAlert({
            name: INFO_ALERT,
            message: ERROR_CODES[status].message,
          })
        );
      }
      thunkAPI.dispatch(asyncErrorHandle(error));
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await request.get(LOGOUT_API_URL);
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("expireAtAccessToken");
    window.localStorage.removeItem("user");
    window.location.href = LOGIN_PAGE_URL;
  } catch (error) {
    thunkAPI.dispatch(asyncErrorHandle(error));
  }
});

export const signup = createAsyncThunk(
  "auth/signup",
  async (body: SignupProps | SignupPropsSocial, thunkAPI) => {
    try {
      await request.post(SIGNUP_API_URL, body);
      thunkAPI.dispatch(authActions.initUser());
      thunkAPI.dispatch(
        alertActions.updateAlert({
          name: INFO_ALERT,
          message: SUCCESS_SIGNUP_MSG,
          confirmFuncName: CONFIRM_PUSH_LOGINPAGE,
        })
      );
    } catch (error) {
      thunkAPI.dispatch(asyncErrorHandle(error));
    }
  }
);

export const emailDuplicationCheck = createAsyncThunk(
  "auth/emailDuplicationCheck",
  async (email: string, thunkAPI) => {
    try {
      await request.get(CONFIRM_DUP_EMAIL_API_URL + `/${email}`);
      thunkAPI.dispatch(
        alertActions.updateAlert({
          name: INFO_ALERT,
          message: SUCCESS_EMAILCHECK_MSG,
        })
      );
    } catch (error) {
      thunkAPI.dispatch(asyncErrorHandle(error));
    }
  }
);

export const sendWebmail = createAsyncThunk(
  "auth/sendWebmail",
  async (email: string, thunkAPI) => {
    try {
      await request.post(SENDMAIL_API_URL, { email });
      thunkAPI.dispatch(
        alertActions.updateAlert({
          name: SUCCESS_ALERT,
          message: SUCCESS_SENDEMAIL_MSG,
        })
      );
    } catch (error) {
      thunkAPI.dispatch(asyncErrorHandle(error));
    }
  }
);

export const verificationNumber = createAsyncThunk(
  "auth/verificationNumber",
  async (body: { email: string; verificationNumber: number }, thunkAPI) => {
    try {
      await request.post(VERIFY_WEBMAIL_API_URL, body);
    } catch (error) {
      thunkAPI.dispatch(asyncErrorHandle(error));
    }
  }
);

export const webmailVerify = (web_email: string) => {
  const domain = web_email?.split("@")[1];
  if (domain) {
    if (Object.values(UniversityList).includes(domain)) {
      const universityName = Object.keys(UniversityList).find(
        (item: string) => UniversityList[item] === domain
      );
      store.dispatch(
        authActions.updateUser({ school: universityName, web_email: web_email })
      );
      return true;
    }
    return false;
  }
  return false;
};
