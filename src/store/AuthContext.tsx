import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { universityList } from "../components/common";
import { useAlert } from "react-alert";
import { useCookies } from "react-cookie";

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
  // token?: string;
  id?: number;
  blockIds?: number[];
}

interface AuthContextObj {
  user: UserPropertys;
  grantRefresh: () => Promise<void>;
  login: (res: AuthReqProps) => void;
  saveUser: (res: AuthResProps<AxiosResponse>) => void;
  sendWebmail: (res: AuthReqProps) => void;
  logout: () => void;
  signup: (res: AuthReqProps) => void;
  emailDuplicationCheck: (res: AuthReqProps) => Promise<boolean>;
  updateUser: (Object: UserPropertys) => void;
  webmailVerify: (res: AuthReqProps) => boolean;
  verificationNumber: (res: AuthReqProps) => void;
  isLogin: boolean;
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
  blockIds?: number[];
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
    // token: "",
    blockIds: [],
  },
  login: () => {},
  logout: () => {},
  saveUser: () => {},
  sendWebmail: () => {},
  signup: () => {},
  emailDuplicationCheck: () =>
    new Promise(() => {
      return false;
    }),
  updateUser: () => {},
  webmailVerify: () => false,
  verificationNumber: () => {},
  grantRefresh: () => new Promise(() => {}),
  isLogin: false,
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
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [isLogin, setIsLogin] = useState(Boolean(cookies.accessToken));

  const router = useRouter();
  const saveUser = (res: AuthResProps<AxiosResponse>) => {
    setUser((preUser: UserPropertys) => {
      const newUser = { ...preUser, ...res };
      window.localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    });
    return res;
  };

  const logout = async () => {
    const response = await axios
      .get("/logout", {
        headers: {
          Authorization: "Bearer " + cookies.accessToken,
        },
      })
      .catch((err) => {
        console.log(err, "로그아웃 에러");
        return err.response;
      });

    if (response.status === 401) {
      // grantRefresh();
      return;
    }
    console.log(response, "로그아웃 성공");
    setIsLogin(false);
    setUser({});
    window.localStorage.clear();
    removeCookie("accessToken", {
      path: "/",
      secure: true,
    });
    // document.cookie = "accessToken=;expires=Thu, 18 Dec 2013 12:00:00 GMT";
    // router.reload();
    // router.push("/account/login");
    window.location.href = "/account/login";
  };

  const loginSuccess = (response: AxiosResponse) => {
    // 일반 로그인 || 리프레시 로그인
    const tokenInfo = response.data.data.token || response.data.data;
    const accessToken = "Bearer " + tokenInfo.accessToken;
    const accessTokenExpiresIn = new Date(Date.now() + tokenInfo.expiresIn);

    // 현재 로그인 시각 브라우저에 저장
    window.localStorage.setItem("loginTime", JSON.stringify(Date.now()));

    // 쿠키가 만료시간이 되면 지워지게 해서 자동으로 로그아웃을 유도
    // 또한 브라우저를 끄고 켜도 로그인 유지
    setCookie("accessToken", accessToken, {
      path: "/",
      secure: true,
      expires: accessTokenExpiresIn,
    });

    setIsLogin(true);

    setTimeout(grantRefresh, tokenInfo.expiresIn - 60000);
    if (response.data.data.profile) {
      const newData: UserPropertys = {
        ...response.data.data.profile,
        blockIds: response.data.data.blockIds,
      };
      updateUser(newData);
    }
  };

  const grantRefresh = async () => {
    const response = await axios
      .post(
        "/users/auth/refresh",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.accessToken,
            Accept: "application/json",
          },
        }
      )
      .catch((err) => {
        console.error(err, "grant access Token Fail");
        console.log(err, "grant access Token Fail");
        return err.response;
      });

    if (response.status === 401) {
      setIsLogin(false);
      message.error("재로그인에 실패하셨습니다.", {
        // onClose: () => {
        //   router.push("/account/login");
        // },
      });

      router.push("/account/login");
      return;
    }

    if (!response.data.isSuccess) {
      console.error(response.data);
      return;
    }
    console.log(response, "Success get accessToken");
    // 성공할경우
    loginSuccess(response);
    // location.reload();
    return;
  };

  const login = async ({
    provider,
    email,
    password,
    kakaoToken,
    facebookId,
    facebookToken,
  }: AuthReqProps) => {
    console.log("로그인 함수 실행");
    const response = await axios
      .post(
        "/login",
        {
          provider: provider,
          email: email,
          password: password,
          kakaoToken: kakaoToken,
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
      .catch((err) => err.response);

    console.log(response);
    if (!response.data.isSuccess) {
      if (response.data.responseMessage === "회원가입 필요") {
        updateUser(response.data.data);
        message.error("회원 정보가 없습니다. 회원가입을 진행합니다.", {
          onClose: () => {
            saveUser(response.data.data);
            router.push("/account/signup/webMailAuth");
          },
        });
        return;
      }
      message.error("로그인에 실패하셨습니다.");
      console.error(response.data.responseMessage);
      return;
    }
    loginSuccess(response);
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
    const signupInfo = {
      email: props.email,
      password: props.password,
      name: props.name,
      web_email: props.web_email,
      school: props.school,
      imageUrl: props.imageUrl,
      provider: props.provider,
    };

    const response = await axios
      .post("/users/signup", signupInfo, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .catch((err) => {
        console.error(err);
        return err.response;
      });
    console.log(response, "signup");

    if (!response.data.isSuccess) {
      window.localStorage.clear();
      message.error("회원가입에 실패하였습니다.");
      return;
    }
    setUser({});
    window.localStorage.clear();
    message.success("회원가입에 성공하셨습니다.", {
      onClose: () => {
        router.push("/account/login");
      },
    });
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
  }: AuthReqProps) => {
    const response = await axios
      .post(
        "/mail/verification",
        {
          email: web_email,
          verificationNumber: verificationNum,
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
    sendWebmail,
    signup,
    emailDuplicationCheck,
    updateUser,
    webmailVerify,
    verificationNumber,
    grantRefresh,
    isLogin,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
export type { UserPropertys };
