import { FacebookLoginProps } from "@greatsumini/react-facebook-login";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Router from "next/router";
import store from ".";
import {
  KakaoLoginProps,
  LoginProps,
  LoginResponseBody,
  SignupProps,
  SignupPropsSocial,
} from "../../types/account";
import { DefaultResponseBody } from "../../types/response";
import {
  CONFIRM_DUP_EMAIL_API_URL,
  ERROR_CODES,
  LOGIN_API_URL,
  LOGIN_PAGE_URL,
  LOGOUT_API_URL,
  MANAGE_MAIN_PAGE_URL,
  POST_PAGE_URL,
  SENDMAIL_API_URL,
  SIGNUP_API_URL,
  VERIFY_WEBMAIL_API_URL,
} from "../constants";
import { UniversityList } from "../constants/UniversityList";
import { saveSecureLocalStorage } from "../utils";
import { request } from "../utils/request";
import { alertActions } from "./alertSlice";

interface UserPropertys {
  email?: string;
  passoword?: string;
  name?: string;
  web_email?: string;
  school?: string;
  imageUrl?: string;
  content?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  country?: string[];
  language?: string[];
  hopeLanguage?: string[];
  repCountry?: string;
  repLanguage?: string;
  repHopeLanguage?: string;
  id?: number;
  blockIds?: number[];
  role?: string;
  provider?: string;
}

interface AuthInitialStateProps {
  user: UserPropertys;
  isLogin: boolean;
}

const initialState: AuthInitialStateProps = {
  user: {},
  isLogin: false,
};

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
      if (user.profile.role === "ADMIN") {
        Router.push(MANAGE_MAIN_PAGE_URL);
        return;
      }
      Router.push(POST_PAGE_URL);
      return;
    } catch (error) {
      const status = error.response.data.status;
      const newUserData = error.response.data.data;
      if (status === "U402") {
        thunkAPI.dispatch(authActions.updateUser(newUserData));
        // 에러와 에러 함수를 전달해서 notification 컴포넌트를 띄워야 합니다.
      }
      thunkAPI.dispatch(
        alertActions.updateAlert({
          name: "Info",
          message: ERROR_CODES[status].message,
        })
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await request.get(LOGOUT_API_URL);
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("expireAtAccessToken");
    window.localStorage.removeItem("user");
    // window.location.href = LOGIN_PAGE_URL;
    Router.push(LOGIN_PAGE_URL);
  } catch (error) {
    const status = error.response.data.status;
    thunkAPI.dispatch(
      alertActions.updateAlert({
        name: "Error",
        message: ERROR_CODES[status].message,
      })
    );
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
          name: "Info",
          message: "회원가입에 성공하셨습니다.",
          confirmFunc: () => {
            Router.push(LOGIN_PAGE_URL);
          },
        })
      );
    } catch (error) {
      const status = error.response.data.status;
      thunkAPI.dispatch(
        alertActions.updateAlert({
          name: "Error",
          message: ERROR_CODES[status].message,
        })
      );
    }
  }
);

export const emailDupicationCheck = createAsyncThunk(
  "auth/emailDuplicationCheck",
  async (email: string, thunkAPI) => {
    try {
      await request.get(CONFIRM_DUP_EMAIL_API_URL + `/${email}`);
      thunkAPI.dispatch(
        alertActions.updateAlert({
          name: "Info",
          message: "사용가능한 아이디 입니다.",
        })
      );
    } catch (error) {
      const status = error.response.data.status;
      thunkAPI.dispatch(
        alertActions.updateAlert({
          name: "Error",
          message: ERROR_CODES[status].message,
        })
      );
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
          name: "Success",
          message:
            "이메일 발송을 완료하였습니다. 인증번호의 만료시간은 3분 입니다.",
        })
      );
    } catch (error) {
      const status = error.response.data.status;
      thunkAPI.dispatch(
        alertActions.updateAlert({
          name: "Error",
          message: ERROR_CODES[status].message,
        })
      );
    }
  }
);

export const verifivationNumber = createAsyncThunk(
  "auth/verificationNumber",
  async (body: { email: string; verificationNumber: number }, thunkAPI) => {
    try {
      await request.post(VERIFY_WEBMAIL_API_URL, body);
      thunkAPI.dispatch(
        alertActions.updateAlert({
          name: "Success",
          message: "인증번호 확인을 완료하였습니다.",
        })
      );
    } catch (error) {
      const status = error.response.data.status;
      thunkAPI.dispatch(
        alertActions.updateAlert({
          name: "Error",
          message: ERROR_CODES[status].message,
        })
      );
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
      state.isLogin = true;

      if (action.payload.profile) {
        const newData: UserPropertys = {
          ...profile,
          blockIds,
        };
        const newUser = { ...state.user, ...newData };
        state.user = newUser;
        saveSecureLocalStorage("user", newUser);
      }
    },
    updateUser(state, action: PayloadAction<UserPropertys>) {
      const newUser = { ...state.user, ...action.payload };
      state.user = newUser;
      saveSecureLocalStorage("user", newUser);
    },
    initUser(state) {
      state.user = {};
      window.localStorage.removeItem("accessToken");
      window.localStorage.removeItem("expireAtAccessToken");
      window.localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
