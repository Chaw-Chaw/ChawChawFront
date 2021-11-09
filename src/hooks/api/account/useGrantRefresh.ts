import axios from "axios";
import { useContext } from "react";
import { useAlert } from "react-alert";
import {
  GrantRefreshResponseType,
  RefreshResponseBody,
} from "../../../../types/account";
import {
  ERROR_CODES,
  EXCEPT_ERROR_MSG,
  LOGIN_PAGE_URL,
} from "../../../constants";
import { GRANTREFRESH_API_URL } from "../../../constants/apiUrls";
import { AuthContext } from "../../../store/AuthContext";
import { saveSecureLocalStorage } from "../../../utils";

export const useGrantRefresh = () => {
  const { setIsLogin } = useContext(AuthContext);
  const message = useAlert();

  const refreshSuccess = (data: RefreshResponseBody) => {
    // 일반 로그인 || 리프레시 로그인
    const token = data;
    const accessToken = "Bearer " + token.accessToken;
    saveSecureLocalStorage("accessToken", accessToken);
    setIsLogin(true);
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
        console.log(err.response);
        const { status } = err.response?.data;
        if (status === "T402" || "T403" || "T404" || "T405") {
          message.error(ERROR_CODES[status].message, {
            onClose: () => {
              window.localStorage.removeItem("accessToken");
              window.localStorage.removeItem("expireAtAccessToken");
              window.localStorage.removeItem("user");
              window.location.href = LOGIN_PAGE_URL;
            },
          });
        }
        throw err;
      }
      message.error(EXCEPT_ERROR_MSG);
      console.error(err);
      throw err;
    }
  };
  return { grantRefresh };
};
