import { useContext } from "react";
import { LOGIN_API_URL, LOGOUT_API_URL } from "../../../constants/apiUrls";
import {
  FacebookLoginProps,
  KakaoLoginProps,
  LoginProps,
  LoginResponseBody,
} from "../../../../types/account";
import { AuthContext, UserPropertys } from "../../../store/AuthContext";
import { saveSecureLocalStorage } from "../../../utils";
import { useApi } from "../useApi";
import { useRouter } from "next/router";
import {
  LOGIN_PAGE_URL,
  MANAGE_MAIN_PAGE_URL,
  POST_PAGE_URL,
} from "../../../constants/pageUrls";

export const useLogin = () => {
  const { setIsLogin, updateUser } = useContext(AuthContext);
  const { sendPost, sendGet } = useApi();
  const router = useRouter();

  const loginSuccess = (data: LoginResponseBody) => {
    // 일반 로그인 || 리프레시 로그인
    const { token, profile, blockIds } = data;
    const accessToken = "Bearer " + token.accessToken;
    const expireAtAccessToken = Date.now() + token.expiresIn;

    saveSecureLocalStorage("expireAtAccessToken", expireAtAccessToken);
    saveSecureLocalStorage("accessToken", accessToken);
    setIsLogin(true);

    if (data.profile) {
      const newData: UserPropertys = {
        ...profile,
        blockIds,
      };
      updateUser(newData);
    }
  };

  const login = async (
    body: LoginProps | KakaoLoginProps | FacebookLoginProps
  ) => {
    try {
      const { data } = await sendPost<LoginResponseBody>(LOGIN_API_URL, body);
      loginSuccess(data);
      if (data.profile.role === "ADMIN") {
        router.push(MANAGE_MAIN_PAGE_URL);
        return;
      }
      router.push(POST_PAGE_URL);
      return;
    } catch {
      return;
    }
  };

  const logout = async () => {
    await sendGet<undefined>(LOGOUT_API_URL);
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("expireAtAccessToken");
    window.localStorage.removeItem("user");
    window.location.href = LOGIN_PAGE_URL;
    return;
  };

  return { login, logout };
};
