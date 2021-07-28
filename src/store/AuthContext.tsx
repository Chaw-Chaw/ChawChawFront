import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
// import { Builder, By, Key, until } from "selenium-webdriver";
interface AuthContextObj {
  isloggedIn: boolean;
  user: Object | undefined;
  login: (res: AuthReqProps) => void;
  kakaoLogin: (res: AuthReqProps) => void;
  saveUser: (res: AuthResProps<AxiosResponse>) => void;
  sendWebmail: (res: AuthReqProps) => void;
  verifyNumber: (res: AuthReqProps) => void;
  // verifyUniversity: () => void;
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
  webmail?: string;
  verificationNum?: number;
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
  sendWebmail: () => {},
  verifyNumber: () => {},
  // verifyUniversity: () => {},

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
      .then(saveUser)
      .then((res) => {
        router.push("/");
        return res;
      })
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
        if (!res.data.isSuccess) {
          console.log(res.data, "로그인 실패");
          // user 정보에 카카오 인증메일
          throw new Error(res.data.responseMessage);
        }
        console.log(res.data);
        return res.data;
      })
      .then(saveUser)
      .then((res) => {
        router.push("/account/signup/webMailAuth");
        return res;
      })
      .catch((err: AuthResProps<AxiosResponse>) => console.log(err));
  };
  const sendWebmail = async ({ webmail }: AuthReqProps) => {
    console.log("웹메일 전송 함수 실행");
    await axios
      .post(
        "/users/send-email",
        { email: webmail },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (!res.data.isSuccess) {
          console.log(res.data, "웹메일 전송 실패");
          throw new Error(res.data.responseMessage);
        }
        console.log(res.data);
        alert("이메일 발송을 완료하였습니다.");
        return res.data;
      })
      .catch((err: AuthResProps<AxiosResponse>) => console.log(err));
  };

  const verifyNumber = async ({ verificationNum }: AuthReqProps) => {
    console.log("인증 번호 확인 함수 실행");
    axios
      .post(
        "/users/verification-email",
        {
          verification_number: verificationNum?.toString(),
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (!res.data.isSuccess) {
          console.log(res.data, "인증번호 확인 실패");
          throw new Error(res.data.responseMessage);
        }
        console.log(res.data);
        alert("인증번호 확인을 완료하였습니다.");
        return res.data;
      })
      .then((res) => {
        router.push("/account/signup");
        return res.data;
      })
      .catch((err: AuthResProps<AxiosResponse>) => console.log(err));
  };

  // const verifyUniversity = async (webmail: string) => {
  //   let driver = await new Builder().forBrowser("chrome").build();
  //   try {
  //     await driver.get("https://www.naver.com/");
  //     let searchInput = await driver.findElement(By.id("query"));
  //     let keyword = webmail;
  //     searchInput.sendKeys(keyword, Key.ENTER);
  //     await driver.wait(until.elementLocated(By.css("#header_wrap")), 4000);
  //     let resultElements = await driver.findElements(By.className("link_tit"));
  //     if (resultElements.length > 0) {
  //       const universityName = await resultElements[0].getText();
  //       console.log(universityName, "get 대학이름");
  //       return universityName;
  //     }
  //   } finally {
  //     driver.quit();
  //   }
  // };

  const contextValue: AuthContextObj = {
    isloggedIn,
    user,
    login,
    saveUser,
    kakaoLogin,
    sendWebmail,
    verifyNumber,
    // verifyUniversity,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
