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
  @media (max-width: 768px) {
    box-sizing: border-box;
    padding-top: 70px;
  }
`;

export { Layout };
