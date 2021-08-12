import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { universityList } from "../components/common";
// import { Builder, By, Key, until } from "selenium-webdriver";
import { useAlert } from "react-alert";
import { redirect } from "next/dist/next-server/server/api-utils";
interface UserPropertys {
  provider?: string;
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
  token?: string;
}

interface AuthContextObj {
  isloggedIn: boolean;
  user: UserPropertys | undefined;
  login: (res: AuthReqProps) => void;
  kakaoLogin: (res: AuthReqProps) => void;
  facebookLogin: (res: AuthReqProps) => void;
  saveUser: (res: AuthResProps<AxiosResponse>) => void;
  sendWebmail: (res: AuthReqProps) => void;
  // verifyUniversity: () => void;
  logout: () => void;
  signup: (res: AuthReqProps) => void;
  //   kakaoSignup: () => void;
  //   facebookSignup: () => void;
  //   webMailAuth: () => void;
  //   webMailNumCheck: () => void;
  emailDuplicationCheck: (res: AuthReqProps) => Promise<boolean>;
  updateUser: (Object: UserPropertys) => void;
  webmailVerify: (webmail: string | undefined) => boolean;
}

interface AuthReqProps {
  accessToken?: string | undefined;
  email?: string;
  password?: string;
  profile?: Object;
  code?: string;
  web_email?: string;
  verificationNum?: number;
  name?: string;
  imageUrl?: string;
  school?: string;
  provider?: string;
}
interface AuthResProps<AxiosResponse> {
  responseMessage?: string;
  isSuccess?: boolean;
}

const AuthContext = React.createContext<AuthContextObj>({
  isloggedIn: false,
  user: {
    provider: "",
    email: "",
    passoword: "",
    name: "",
    web_email: "",
    school: "",
    imageUrl: "",
    content: "",
    facebookUrl: "",
    instagramUrl: "",
    country: ["", ""],
    language: ["", "", "", ""],
    hopeLanguage: ["", "", "", ""],
    repCountry: "",
    repLanguage: "",
    repHopeLanguage: "",
    token: "",
  },
  login: () => {},
  logout: () => {},
  kakaoLogin: () => {},
  saveUser: () => {},
  sendWebmail: () => {},

  facebookLogin: () => {},
  //   logout: () => {},
  signup: () => {},
  //   kakaoSignup: () => {},
  //   facebookSignup: () => {},
  //   webMailAuth: () => {},
  //   webMailNumCheck: () => {},
  emailDuplicationCheck: () =>
    new Promise(() => {
      return false;
    }),
  updateUser: () => {},
  webmailVerify: () => false,
});

const AuthContextProvider: React.FC = (props) => {
  const message = useAlert();
  const [isloggedIn, setIsLoggedIn] = useState(false);
  // const localUser = window ? window.localStorage.getItem("user") : null;
  const [user, setUser] = useState({});
  const router = useRouter();
  const saveUser = (res: AuthResProps<AxiosResponse>) => {
    setUser((preUser) => {
      return { ...preUser, ...res };
    });
    console.log(user, "Save userInfo");
    return res;
  };

  const logout = () => {
    setUser({});
    window.localStorage.clear();
    router.push("/account/login");
  };
  const login = async ({ email, password }: AuthReqProps) => {
    console.log("로그인 함수 실행");
    await axios
      .post(
        "/login",
        {
          provider: "",
          email: email,
          password: password,
          code: "",
          accessToken: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (!res.data.isSuccess) {
          throw new Error(res.data.responseMessage);
        } else {
          console.log(res.data.data);
          const token = res.headers.authorization;
          const newData = { ...res.data.data, token };
          return newData;
        }
      })
      .then(saveUser)
      .then((res) => {
        router.push("/post");
        return res;
      })
      .catch((err: AuthResProps<AxiosResponse>) => {
        message.error("로그인에 실패하셨습니다.");
        console.log(err);
      });
  };

  const kakaoLogin = async ({ code }: AuthReqProps) => {
    console.log("카카오 로그인 함수 실행");
    await axios
      .post(
        "/login",
        {
          provider: "kakao",
          email: "",
          password: "",
          code: code,
          accessToken: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (!res.data.isSuccess) {
          console.log(res.data, "로그인 실패");
          if (res.data.responseMessage === "회원가입 필요") {
            message.error("회원 정보가 없습니다. 회원가입을 진행합니다.", {
              onClose: () => {
                router.push("/account/signup/webMailAuth");
              },
            });
            return res.data.data;
          }
          throw new Error(res.data);
        } else {
          const token = res.headers.authorization;
          const newData = { ...res.data.data, token };
          return newData;
        }
      })
      .then(saveUser)
      .then((res) => {
        router.push("/post");
        return res;
      })
      .catch((err: AuthResProps<AxiosResponse>) => {
        message.error("인가코드가 잘못되었습니다.", {
          onClose: () => {
            history.back();
          },
        });
        console.error(err);
      });
  };

  const facebookLogin = async ({ accessToken, email }: AuthReqProps) => {
    console.log(accessToken, email, "페이스북 로그인 함수 실행");
    await axios
      .post(
        "/login",
        {
          provider: "facebook",
          email: email,
          password: "",
          code: "",
          accessToken: accessToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res, "facebookLogin");
        if (!res.data.isSuccess) {
          if (res.data.responseMessage === "회원가입 필요") {
            message.error("회원 정보가 없습니다. 회원가입을 진행합니다.", {
              onClose: () => {
                router.push("/account/signup/webMailAuth");
              },
            });
            return res.data.data;
          }
          throw new Error(res.data);
        } else {
          const token = res.headers.authorization;
          const newData = { ...res.data.data, token };
          router.push("/post");
          return newData;
        }
      })
      .then(saveUser)
      .catch((err: AuthResProps<AxiosResponse>) => {
        message.error("인가코드가 잘못되었습니다.", {
          onClose: () => {
            history.back();
          },
        });
        console.error(err);
      });
  };

  const webmailVerify = (webmail: string | undefined) => {
    const domain = webmail?.split("@")[1];
    if (domain) {
      if (Object.values(universityList).includes(domain)) {
        const universityName = Object.keys(universityList).find(
          (item: string) => universityList[item] === domain
        );
        updateUser({ school: universityName, web_email: webmail });
        return true;
      }
      return false;
    }
    return false;
  };
  const sendWebmail = async ({ web_email }: AuthReqProps) => {
    console.log({ web_email }, "웹메일 전송 함수 실행");
    // webmailVerify(web_email);
    await axios
      .post(
        "/mail/send",
        { email: web_email },
        {
          headers: {
            "Content-Type": "application/json",
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
        message.show(
          "이메일 발송을 완료하였습니다. 인증번호의 만료시간은 3분입니다."
        );
        return res.data;
      })
      .catch((err: AuthResProps<AxiosResponse>) => console.log(err));
  };

  const signup = async (props: AuthReqProps) => {
    const info = {
      email: props.email,
      password: props.password,
      name: props.name,
      web_email: props.web_email,
      school: props.school,
      imageUrl: props.imageUrl,
      provider: props.provider,
    };
    console.log(info, "회원가입 정보");

    await axios
      .post("/users/signup", info, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          setUser({});
          message.success("회원가입에 성공하셨습니다.");
          router.push("/account/login");
        } else {
          message.error("회원가입에 실패하였습니다.");
          throw new Error("회원가입에 실패하였습니다.");
        }
      })
      .catch((err) => console.error(err));
  };
  const emailDuplicationCheck = async ({ email }: AuthReqProps) => {
    let result = false;
    await axios
      .get(`/users/email/duplicate/${email}`)
      .then((res) => {
        if (res.data.isSuccess) {
          message.error("중복된 이메일이 있습니다.");
          result = true;
        } else if (!res.data.isSuccess) {
          result = false;
          message.show("사용가능한 아이디 입니다.");
        }
        console.log(res.data, "emailDuplication Response");
      })
      .catch((err: AuthResProps<AxiosResponse>) => console.error(err));
    return result;
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
  const updateUser = (newUserInfo: UserPropertys) => {
    setUser((preUser) => {
      return { ...preUser, ...user };
    });
  };

  const contextValue: AuthContextObj = {
    isloggedIn,
    user,
    login,
    logout,
    saveUser,
    kakaoLogin,
    facebookLogin,
    sendWebmail,
    signup,
    emailDuplicationCheck,
    updateUser,
    webmailVerify,
    // verifyUniversity,
  };
  useEffect(() => {
    const initUser = window.localStorage.getItem("user");
    setUser((preUser) => {
      return initUser === null ? preUser : JSON.parse(initUser);
    });
  }, []);

  useEffect(() => {
    if (JSON.stringify(user) === JSON.stringify({})) {
      console.log("페이지 초기화");
      window.localStorage.clear();
      return;
    } else {
      console.log(user, "Change userInfo");
      window.localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
