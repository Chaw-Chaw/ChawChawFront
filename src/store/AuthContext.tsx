import React, { useEffect, useState } from "react";
import {
  getSecureLocalStorage,
  saveSecureLocalStorage,
  avoidLocalStorageUndefined,
} from "../utils";

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
  id?: number;
  blockIds?: number[];
  role?: string;
  provider?: string;
}

interface AuthContextObj {
  user: UserPropertys;
  setUser: React.Dispatch<React.SetStateAction<UserPropertys>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  updateUser: (newUserInfo: UserPropertys) => void;
}

const AuthContext = React.createContext<AuthContextObj>({
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
    country: ["", ""],
    language: ["", "", "", ""],
    hopeLanguage: ["", "", "", ""],
    repCountry: "",
    repLanguage: "",
    repHopeLanguage: "",
    // token: "",
    blockIds: [],
    role: "",
  },
  setUser: () => {},
  updateUser: () => {},
  isLogin: false,
  setIsLogin: () => {},
});

const AuthContextProvider: React.FC = (props) => {
  const [user, setUser] = useState<UserPropertys>(
    avoidLocalStorageUndefined("user", {})
  );
  const [isLogin, setIsLogin] = useState(
    Boolean(avoidLocalStorageUndefined("accessToken", false))
  );

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
      saveSecureLocalStorage("user", newUser);
      return newUser;
    });
  };

  const contextValue: AuthContextObj = {
    user,
    setUser,
    updateUser,
    isLogin,
    setIsLogin,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
export type { UserPropertys };
