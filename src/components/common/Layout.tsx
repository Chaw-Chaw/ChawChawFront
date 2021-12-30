import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import styled from "styled-components";
import {
  ADMIN_ROLE,
  CONFIRM_PUSH_MANAGE_MAINPAGE,
  ERROR_ALERT,
  ERROR_MANAGMENT_NOTACCESS_MSG,
} from "../../constants";
import { MANAGE_MAIN_PAGE_URL } from "../../constants/pageUrls";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { alertActions } from "../../store/alertSlice";
import { AuthContext } from "../../store/AuthContext";
import Header from "./Header";

const Layout: React.FC = (props) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (user.role === ADMIN_ROLE) {
      dispatch(
        alertActions.updateAlert({
          name: ERROR_ALERT,
          message: ERROR_MANAGMENT_NOTACCESS_MSG,
          confirmFuncName: CONFIRM_PUSH_MANAGE_MAINPAGE,
        })
      );
      return;
    }
  }, [user.role, dispatch]);

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
