import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { Layout } from "../../../components/common";
import { SettingBlockList } from "../../../components/setting/SettingBlockList";
import { SettingUserDelete } from "../../../components/setting/SettingUserDelete";
import { SettingUserUniversity } from "../../../components/setting/SettingUserUniversity";
import {
  CONFIRM_PUSH_LOGINPAGE,
  ERROR_ALERT,
  ERROR_ENTER_AFTERLOGIN_MSG,
  ROLE_ADMIN,
} from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { alertActions } from "../../../store/alertSlice";
import { isLogin, userRole } from "../../../utils";

export default function Setting() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userRole() === ROLE_ADMIN) {
      return;
    }
    if (!isLogin()) {
      dispatch(
        alertActions.updateAlert({
          name: ERROR_ALERT,
          message: ERROR_ENTER_AFTERLOGIN_MSG,
          confirmFuncName: CONFIRM_PUSH_LOGINPAGE,
        })
      );
      return;
    }
  }, [dispatch]);

  return (
    <Layout>
      <Container>
        <SettingInfoBox>
          <SettingBlockList />
          <SettingUserUniversity />
          <SettingUserDelete />
        </SettingInfoBox>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px 0px;
`;

const SettingInfoBox = styled.div`
  width: 650px;
  @media (max-width: 768px) {
    width: 500px;
  }
  @media (max-width: 500px) {
    width: 320px;
  }
`;
