import { NextRouter, Router, useRouter } from "next/router";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { AuthContext } from "../../store/AuthContext";
import {
  getRefreshAccessTokenRemainingTime,
  getSecureLocalStorage,
} from "../../utils";
import Header from "./Header";

const Layout: React.FC<{ type?: string }> = (props) => {
  const { grantRefresh, isLogin } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) return;
    const userRole = getSecureLocalStorage("user").role;
    if (userRole === "ADMIN") {
      router.push("/manage/users");
    }
    setTimeout(grantRefresh, getRefreshAccessTokenRemainingTime());

    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  return (
    <>
      {router.pathname !== "/" && <Header type={props.type} />}
      <Inner>{props.children}</Inner>
    </>
  );
};

const Inner = styled.main`
  margin: 0px auto 0px auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 110px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding-top: 70px;
  }
`;

export { Layout };
