import axios from "axios";
import { getSecureLocalStorage, saveSecureLocalStorage } from ".";
import {
  GrantRefreshResponseType,
  RefreshResponseBody,
} from "../../types/account";
import {
  ERROR_CODES,
  GRANTREFRESH_API_URL,
  LOGIN_PAGE_URL,
} from "../constants";

export const request = axios.create({
  withCredentials: true,
  headers: {},
});

const refreshSuccess = (data: RefreshResponseBody) => {
  // 일반 로그인 || 리프레시 로그인
  const token = data;
  const accessToken = "Bearer " + token.accessToken;
  const expireAtAccessToken = Date.now() + token.expiresIn;

  saveSecureLocalStorage("expireAtAccessToken", expireAtAccessToken);
  saveSecureLocalStorage("accessToken", accessToken);
};

const grantRefresh = async () => {
  try {
    const {
      data: { data },
    } = await axios.post<GrantRefreshResponseType>(GRANTREFRESH_API_URL);
    refreshSuccess(data);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (!err.response) return;
      const { status } = err.response.data;
      if (
        status === "T402" ||
        status === "T403" ||
        status === "T404" ||
        status === "T405" ||
        status === "G403"
      ) {
        alert(ERROR_CODES[status].message);
        window.localStorage.clear();
        window.location.href = LOGIN_PAGE_URL;
        return;
      }
      return;
    }
  }
};

request.interceptors.request.use(
  async (config) => {
    const expireAt = getSecureLocalStorage("expireAtAccessToken");
    if (expireAt && Date.now() - expireAt > 0) {
      await grantRefresh();
    }
    const accessToken = getSecureLocalStorage("accessToken");

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

request.interceptors.response.use();
