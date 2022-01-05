import { useEffect } from "react";
import { Layout } from "../../../components/common";
import ProfileSection from "../../../components/profile/ProfileSection";
import {
  CONFIRM_PUSH_LOGINPAGE,
  ERROR_ALERT,
  ERROR_ENTER_AFTERLOGIN_MSG,
} from "../../../constants/alert";
import { useAppDispatch } from "../../../hooks/redux";
import { alertActions } from "../../../store/alertSlice";
import { isLogin } from "../../../utils";

export default function Profile() {
  const dispatch = useAppDispatch();

  useEffect(() => {
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
      <ProfileSection />
    </Layout>
  );
}
