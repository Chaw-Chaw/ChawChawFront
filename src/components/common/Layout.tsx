import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { AuthContext } from "../../store/AuthContext";
import { getSecureLocalStorage } from "../../utils";
import Header from "./Header";

const Layout: React.FC<{ type?: string }> = (props) => {
  const { grantRefresh, isLogin } = useContext(AuthContext);

  const loginTime = (() => {
    if (typeof window === "undefined") return {};
    const localStorageLoginTime = getSecureLocalStorage("loginTime");
    if (!localStorageLoginTime) return 0;
    return localStorageLoginTime;
  })();

  useEffect(() => {
    if (!isLogin) return;
    console.log(loginTime, "loginTime");
    setTimeout(grantRefresh, loginTime + 180000 - 60000);
  }, []);

  return (
    <>
      <Header type={props.type} />
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
