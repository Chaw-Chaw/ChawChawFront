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
  id?: number;
}

interface AuthContextObj {
  user: UserPropertys;
  login: (res: AuthReqProps) => void;
  kakaoLogin: (res: AuthReqProps) => void;
  facebookLogin: (res: AuthReqProps) => void;
  saveUser: (res: AuthResProps<AxiosResponse>) => void;
  sendWebmail: (res: AuthReqProps) => void;
  logout: () => void;
  signup: (res: AuthReqProps) => void;
  emailDuplicationCheck: (res: AuthReqProps) => Promise<boolean>;
  updateUser: (Object: UserPropertys) => void;
  webmailVerify: (res: AuthReqProps) => boolean;
  verificationNumber: (res: AuthReqProps) => void;
}

interface AuthReqProps {
  email?: string;
  password?: string;
  profile?: Object;
  web_email?: string;
  verificationNum?: string;
  name?: string;
  imageUrl?: string;
  school?: string;
  provider?: string;
  kakaoToken?: string;
  facebookId?: string;
  facebookToken?: string;
}
interface AuthResProps<AxiosResponse> {
  responseMessage?: string;
  isSuccess?: boolean;
}

const AuthContext = React.createContext<AuthContextObj>({
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
  signup: () => {},
  emailDuplicationCheck: () =>
    new Promise(() => {
      return false;
    }),
  updateUser: () => {},
  webmailVerify: () => false,
  verificationNumber: () => {},
});

const AuthContextProvider: React.FC = (props) => {
  const message = useAlert();
  const [user, setUser] = useState(
    (() => {
      if (typeof window === "undefined") return {};
      const localStorageUser = window.localStorage.getItem("user");
      if (!localStorageUser) return {};
      return JSON.parse(localStorageUser);
    })()
  );
  const router = useRouter();
  const saveUser = (res: AuthResProps<AxiosResponse>) => {
    setUser((preUser: UserPropertys) => {
      const newUser = { ...preUser, ...res };
      window.localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    });
    console.log("Save userInfo");
    return res;
  };

  const logout = () => {
    setUser({});
    window.localStorage.clear();
    router.push("/account/login");
  };

  const login = async ({ email, password }: AuthReqProps) => {
    console.log("로그인 함수 실행");
    const response = await axios
      .post(
        "/login",
        {
          provider: "",
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .catch((err) => err.response);
    const data = response.data.data;
    console.log(response);
    if (!response.data.isSuccess) {
      message.error("로그인에 실패하셨습니다.");
      console.error(response.data.responseMessage);
      return;
    }

    const token = response.headers.authorization;
    const newData = { ...data, token };
    saveUser(newData);
    router.push("/post");
  };

  const kakaoLogin = async ({ kakaoToken }: AuthReqProps) => {
    console.log("카카오 로그인 함수 실행");
    const response = await axios
      .post(
        "/login",
        {
          provider: "kakao",
          kakaoToken: kakaoToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .catch((err) => {
        message.error("인가코드가 잘못되었습니다.", {
          onClose: () => {
            history.back();
          },
        });
        console.error(err);
        return err.response;
      });
    const data = response.data.data;

    if (!response.data.isSuccess) {
      console.log(response.data, "로그인 실패");

      if (response.data.responseMessage === "회원가입 필요") {
        message.error("회원 정보가 없습니다. 회원가입을 진행합니다.", {
          onClose: () => {
            router.push("/account/signup/webMailAuth");
          },
        });
        return;
      }
      console.error(response.data);
      return;
    }
    const token = response.headers.authorization;
    const newData = { ...data, token };
    saveUser(newData);
    router.push("/post");
  };

  const facebookLogin = async ({ facebookToken, facebookId }: AuthReqProps) => {
    console.log(facebookToken, facebookId, "페이스북 로그인 함수 실행");
    const response = await axios
      .post(
        "/login",
        {
          provider: "facebook",
          facebookId: facebookId,
          facebookToken: facebookToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .catch((err) => {
        message.error("인가코드가 잘못되었습니다.", {
          onClose: () => {
            history.back();
          },
        });
        console.error(err);
        return err.response;
      });

    const data = response.data.data;

    console.log(response, "facebookLogin");
    if (!response.data.isSuccess) {
      if (response.data.responseMessage === "회원가입 필요") {
        message.error("회원 정보가 없습니다. 회원가입을 진행합니다.", {
          onClose: () => {
            router.push("/account/signup/webMailAuth");
          },
        });
        return;
      }
      console.error(response.data);
      return;
    }
    const token = response.headers.authorization;
    const newData = { ...data, token };
    saveUser(newData);
    router.push("/post");
  };

  const webmailVerify = ({ web_email }: AuthReqProps) => {
    const domain = web_email?.split("@")[1];
    if (domain) {
      if (Object.values(universityList).includes(domain)) {
        const universityName = Object.keys(universityList).find(
          (item: string) => universityList[item] === domain
        );
        updateUser({ school: universityName, web_email: web_email });
        return true;
      }
      return false;
    }
    return false;
  };

  const sendWebmail = async ({ web_email }: AuthReqProps) => {
    console.log({ web_email }, "웹메일 전송 함수 실행");
    const response = await axios
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
      .catch((err) => {
        console.error(err);
        return err.response;
      });

    if (!response.data.isSuccess) {
      console.log(response.data, "웹메일 전송 실패");
      console.error(response.data.responseMessage);
      return;
    }
    console.log(response.data, "웹메일 전송 확인 데이터");
    message.show(
      "이메일 발송을 완료하였습니다. 인증번호의 만료시간은 3분입니다."
    );
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

    const response = await axios
      .post("/users/signup", info, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .catch((err) => {
        console.error(err);
        return err.response;
      });

    if (!response.data.isSuccess) {
      message.error("회원가입에 실패하였습니다.");
      console.error("회원가입에 실패하였습니다.");
      return;
    }
    message.success("회원가입에 성공하셨습니다.");
    logout();
  };

  const emailDuplicationCheck = async ({ email }: AuthReqProps) => {
    const response = await axios
      .get(`/users/email/duplicate/${email}`)
      .catch((err) => {
        console.error(err);
        return err.response;
      });

    console.log(response.data, "emailDuplication Response");
    if (!response.data.isSuccess) {
      message.show("사용가능한 아이디 입니다.");
      return false;
    }
    message.error("중복된 이메일이 있습니다.");
    return true;
  };

  const verificationNumber = async ({
    web_email,
    verificationNum,
    provider,
  }: AuthReqProps) => {
    const response = await axios
      .post(
        "/mail/verification",
        {
          email: web_email,
          verificationNumber: verificationNum,
          provider: provider,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .catch((err) => {
        console.error(err);
        return err.response;
      });

    if (!response.data.isSuccess) {
      console.log(response.data, "인증번호 확인 실패");
      message.error("인증번호가 잘못 되었습니다.");
      console.error(response.data.responseMessage);
      return;
    }
    console.log(response.data);
    message.success("인증번호 확인을 완료하였습니다.");
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
    setUser((preUser: UserPropertys) => {
      const newUser = { ...preUser, ...newUserInfo };
      console.log(preUser, newUser, "updateUser");
      window.localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    });
    console.log("update userInfo");
  };

  const contextValue: AuthContextObj = {
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
    verificationNumber,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
export type { UserPropertys };
