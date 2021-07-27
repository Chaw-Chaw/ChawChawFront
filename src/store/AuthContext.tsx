import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
interface AuthContextObj {
  isloggedIn: boolean;
  user: Object | undefined;
  login: (res: AuthReqProps) => void;
  kakaoLogin: (res: AuthReqProps) => void;
  saveUser: (res: AuthResProps<AxiosResponse>) => void;
  //   kakaoLogin: () => void;
  //   facebookLogin: () => void;
  //   logout: () => void;
  //   signup: () => void;
  //   kakaoSignup: () => void;
  //   facebookSignup: () => void;
  //   webMailAuth: () => void;
  //   webMailNumCheck: () => void;
  //   emailDuplicationCheck: () => void;
}

interface AuthReqProps {
  email?: string;
  password?: string;
  profile?: Object;
  code?: string;
}
interface AuthResProps<AxiosResponse> {
  responseMessage?: string;
  isSuccess?: boolean;
}

const AuthContext = React.createContext<AuthContextObj>({
  isloggedIn: false,
  user: {},
  login: () => {},
  kakaoLogin: () => {},
  saveUser: () => {},

  //   kakaoLogin: () => {},
  //   facebookLogin: () => {},
  //   logout: () => {},
  //   signup: () => {},
  //   kakaoSignup: () => {},
  //   facebookSignup: () => {},
  //   webMailAuth: () => {},
  //   webMailNumCheck: () => {},
  //   emailDuplicationCheck: () => {},
});

const AuthContextProvider: React.FC = (props) => {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (localStorage) {
      setUser(localStorage.getItem("user") || {});
    }
    if (user) setIsLoggedIn(true);
  }, []);

  const saveUser = (res: AuthResProps<AxiosResponse>) => {
    const newUser = { ...user, ...res };
    setUser(newUser);
    console.log(newUser, "Save userInfo");
    return res;
  };

  const login = async ({ email, password }: AuthReqProps) => {
    console.log("로그인 함수 실행");
    await axios
      .post(
        "/login",
        { email: email, password: password },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (!res.data.isSuccess) {
          throw new Error(res.data.responseMessage);
        }
        console.log(res.data);
        return res.data;
      })
      .then((res: AxiosResponse) => saveUser)
      .then(() => router.push("/"))
      .catch((err: AuthResProps<AxiosResponse>) => console.log(err));
  };

  const kakaoLogin = async ({ code }: AuthReqProps) => {
    console.log("카카오 로그인 함수 실행");
    await axios
      .post(
        "/users/login/kakao",
        { code: code },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (!res.data.isSuccess) {
          console.log(res.data, "로그인 실패");
          // user 정보에 카카오 인증메일
          throw new Error(res.data.responseMessage);
        }
        console.log(res.data);
        router.push("/account/signup/webMailAuth");
        return res.data;
      })
      .then((res: AxiosResponse) => saveUser)
      .then(() => router.push("/"))
      .catch((err: AuthResProps<AxiosResponse>) => console.log(err));
  };

  const contextValue: AuthContextObj = {
    isloggedIn,
    user,
    login,
    saveUser,
    kakaoLogin,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
