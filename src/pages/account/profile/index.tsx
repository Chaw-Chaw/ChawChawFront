import { useContext, useEffect } from "react";
import { Layout } from "../../../components/common";
import ProfileSection from "../../../components/profile/ProfileSection";
import { LOGIN_PAGE_URL } from "../../../constants";
import {
  CONFIRM_PUSH_LOGINPAGE,
  ERROR_ALERT,
  ERROR_ENTER_AFTERLOGIN_MSG,
} from "../../../constants/alert";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { alertActions } from "../../../store/alertSlice";

export default function Profile() {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  useEffect(() => {
    if (!isLogin) {
      dispatch(
        alertActions.updateAlert({
          name: ERROR_ALERT,
          message: ERROR_ENTER_AFTERLOGIN_MSG,
          confirmFuncName: CONFIRM_PUSH_LOGINPAGE,
        })
      );
      return;
    }
  }, [dispatch, isLogin]);

  return (
    <Layout>
      <ProfileSection />
    </Layout>
  );
}
