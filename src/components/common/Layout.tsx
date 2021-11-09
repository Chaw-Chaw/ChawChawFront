import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useAlert } from "react-alert";
import styled from "styled-components";
import { MANAGE_MAIN_PAGE_URL } from "../../constants/pageUrls";
import { AuthContext } from "../../store/AuthContext";
import Header from "./Header";

const Layout: React.FC = (props) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const message = useAlert();

  useEffect(() => {
    if (user.role === "ADMIN") {
      message.error("관리자 아이디로 서비스를 이용할 수 없습니다.", {
        onClose: () => {
          router.push(MANAGE_MAIN_PAGE_URL);
        },
      });
      return;
    }
  }, []);

  return (
    <>
      {router.pathname !== "/" && <Header />}
      <Inner>{props.children}</Inner>
    </>
  );
};

const Inner = styled.main`
  margin: 0px auto 0px auto;
  height: 100vh;
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
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
