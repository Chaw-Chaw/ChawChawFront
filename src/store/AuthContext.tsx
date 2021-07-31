import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { universityList } from "../components/common";
// import { Builder, By, Key, until } from "selenium-webdriver";
import { useAlert } from "react-alert";
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
}

interface AuthContextObj {
  isloggedIn: boolean;
  user: UserPropertys | undefined;
  login: (res: AuthReqProps) => void;
  kakaoLogin: (res: AuthReqProps) => void;
  facebookLogin: (res: AuthReqProps) => void;
  saveUser: (res: AuthResProps<AxiosResponse>) => void;
  sendWebmail: (res: AuthReqProps) => void;
  verifyNumber: (res: AuthReqProps) => void;
  // verifyUniversity: () => void;
  //   logout: () => void;
  signup: (res: AuthReqProps) => void;
  //   kakaoSignup: () => void;
  //   facebookSignup: () => void;
  //   webMailAuth: () => void;
  //   webMailNumCheck: () => void;
  emailDuplicationCheck: (res: AuthReqProps) => void;
  updateUser: (Object: UserPropertys) => void;
  sendImage: (res: AuthReqProps) => void;
}

interface AuthReqProps {
  email?: string;
  password?: string;
  profile?: Object;
  code?: string;
  webmail?: string;
  verificationNum?: number;
  name?: string;
  image?: FormData;
}
interface AuthResProps<AxiosResponse> {
  responseMessage?: string;
  isSuccess?: boolean;
}

const AuthContext = React.createContext<AuthContextObj>({
  isloggedIn: false,
  user: {
    email: "",
    passoword: "",
    name: "",
    web_email: "",
    school: "",
    imageUrl: "",
    content: "",
    facebookUrl: "",
    instagramUrl: "",
    country: [],
    language: [],
    hopeLanguage: [],
    repCountry: "",
    repLanguage: "",
    repHopeLanguage: "",
  },
  login: () => {},
  kakaoLogin: () => {},
  saveUser: () => {},
  sendWebmail: () => {},
  verifyNumber: () => {},
  facebookLogin: () => {},
  //   logout: () => {},
  signup: () => {},
  //   kakaoSignup: () => {},
  //   facebookSignup: () => {},
  //   webMailAuth: () => {},
  //   webMailNumCheck: () => {},
  emailDuplicationCheck: () => {},
  updateUser: () => {},
  sendImage: () => {},
});

const AuthContextProvider: React.FC = (props) => {
  const message = useAlert();
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
    // ActionPopup.open();
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
        return res.data.data;
      })
      .then(saveUser)
      .then((res) => {
        router.push("/");
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
          throw res.data;
        } else {
          console.log(res.data);
          return res.data;
        }
      })
      .then(saveUser, (res) => {
        console.log(res, "실패라인");
        if (res.responseMessage === "회원가입 필요") {
          const newUser = { ...user, ...res };
          setUser(newUser);
          message.error("회원 정보가 없습니다. 회원가입을 진행합니다.", {
            onClose: () => {
              router.push("/account/signup/webMailAuth");
            },
          });
          return res;
        } else {
          throw new Error(res.responseMessage);
        }
      })
      .then((res) => {
        router.push("/post");
        return res;
      })
      .then((res) => {
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

  const facebookLogin = async ({ code, email }: AuthReqProps) => {
    console.log("카카오 로그인 함수 실행");
    await axios
      .post(
        "/users/login/facebook",
        { accessToken: code, email: email },
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
          throw res.data;
        }
        console.log(res.data);
        return res.data;
      })
      .then(saveUser, (res) => {
        console.log(res, "실패라인");
        if (res.responseMessage === "회원가입 필요") {
          const newUser = { ...user, ...res };
          setUser(newUser);
          message.error("회원 정보가 없습니다. 회원가입을 진행합니다.", {
            onClose: () => {
              router.push("/account/signup/webMailAuth");
            },
          });
          return res;
        } else {
          throw new Error(res.responseMessage);
        }
      })
      .then((res) => {
        router.push("/post");
        return res;
      })
      .then((res) => {
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

  const webmailVerify = (webmail: string | undefined) => {
    const domain = webmail?.split("@")[1];
    if (domain) {
      if (Object.values(universityList).includes(domain)) {
        const universityName = Object.keys(universityList).find(
          (item: string) => universityList[item] === domain
        );
        updateUser({ school: universityName });
      }
    }
  };
  const sendWebmail = async ({ webmail }: AuthReqProps) => {
    console.log("웹메일 전송 함수 실행");
    webmailVerify(webmail);
    await axios
      .post(
        "/mail/send",
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
        message.show(
          "이메일 발송을 완료하였습니다. 인증번호의 만료시간은 3분입니다."
        );
        return res.data;
      })
      .catch((err: AuthResProps<AxiosResponse>) => console.log(err));
  };

  const verifyNumber = async ({ verificationNum }: AuthReqProps) => {
    console.log("인증 번호 확인 함수 실행");
    axios
      .post(
        "/mail/verification",
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

  const signup = () => {};
  const emailDuplicationCheck = async ({ email }: AuthReqProps) => {
    await axios
      .get(`/users/email/duplicate/${email}`)
      .then((res) => {
        if (res.data.isSuccess) {
          message.error("중복된 이메일이 있습니다.");
        }
        message.show("사용가능한 아이디 입니다.");
        return res.data;
      })
      .catch((err: AuthResProps<AxiosResponse>) => console.log(err));
    return;
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
    const newUser = { ...user, ...newUserInfo };
    setUser(newUser);
  };

  const sendImage = async ({ image }: AuthReqProps) => {
    await axios
      .post(
        "/users/image/upload",
        {
          image: image,
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.isSuccess) {
          console.log(
            res.data.imageUrl,
            "이미지가 성공적으로 업로드 되었습니다. "
          );
          return res.data;
        }
        throw new Error(res.data);
      })
      .then(saveUser)
      .catch((err) => console.error(err.responseMessage));
  };

  const contextValue: AuthContextObj = {
    isloggedIn,
    user: {
      email: "",
      passoword: "",
      name: "",
      web_email: "",
      school: "",
      imageUrl: "",
      content: "",
      facebookUrl: "",
      instagramUrl: "",
      country: [],
      language: [],
      hopeLanguage: [],
      repCountry: "",
      repLanguage: "",
      repHopeLanguage: "",
    },
    login,
    saveUser,
    kakaoLogin,
    facebookLogin,
    sendWebmail,
    verifyNumber,
    signup,
    emailDuplicationCheck,
    updateUser,
    sendImage,
    // verifyUniversity,
  };
  useEffect(() => {
    console.log(user, "Change userInfo");
  }, [user]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
