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
    setUser(localStorage.getItem("user") || {});
    if (user) setIsLoggedIn(true);
  }, []);

  const saveUser = (res: AuthResProps<AxiosResponse>) => {
    console.log(res, "Save userInfo");
    if (!res.isSuccess) {
      throw new Error(res.responseMessage);
    }
    const newUser = { ...user, ...res };
    setUser(newUser);
    return res;
  };

  const login = ({ email, password }: AuthReqProps) => {
    axios
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
      .then((res: AxiosResponse) => saveUser)
      .then(() => router.push("/"))
      .catch((err: AuthResProps<AxiosResponse>) =>
        console.log(err.responseMessage)
      );
  };

  const kakaoLogin = ({ email }: AuthReqProps) => {
    axios
      .post(
        "/user/login/kakao",
        { email: email },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res: AxiosResponse) => saveUser)
      .then(() => router.push("/"))
      .catch((err: AuthResProps<AxiosResponse>) =>
        console.log(err.responseMessage)
      );
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
