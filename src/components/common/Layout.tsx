import { useRouter } from "next/router";
import { useEffect } from "react";
import { userRole } from "../../utils/index";
import styled from "styled-components";
import {
  CONFIRM_PUSH_MANAGE_MAINPAGE,
  ERROR_ALERT,
  ERROR_MANAGMENT_NOTACCESS_MSG,
  ROLE_ADMIN,
} from "../../constants";
import { useAppDispatch } from "../../hooks/redux";
import { alertActions } from "../../store/alertSlice";
import { ChatContextProvider } from "../../store/ChatContext";
import Header from "./Header";

const Layout: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (userRole() === ROLE_ADMIN) {
      dispatch(
        alertActions.updateAlert({
          name: ERROR_ALERT,
          message: ERROR_MANAGMENT_NOTACCESS_MSG,
          confirmFuncName: CONFIRM_PUSH_MANAGE_MAINPAGE,
        })
      );
      return;
    }
  }, [dispatch]);

  return (
    <ChatContextProvider>
      {router.pathname !== "/" && <Header />}
      <Inner>{props.children}</Inner>
    </ChatContextProvider>
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
