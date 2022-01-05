import FacebookLogin from "@greatsumini/react-facebook-login";
import React from "react";
import {
  ERROR_ALERT,
  FACEBOOK_APP_ID,
  FACEBOOK_PROVIDER,
} from "../../constants";
import CSS from "csstype";
import { useAppDispatch } from "../../hooks/redux";
import { alertActions } from "../../store/alertSlice";
import { login } from "../../store/actions/authActions";

const MFacebookLoginWrap: React.FC<{ children: React.ReactNode }> = (props) => {
  const dispatch = useAppDispatch();
  const onSuccess:
    | ((
        res:
          | {
              accessToken: string;
              expiresIn: string;
              reauthorize_required_in: string;
              signedRequest: string;
              userID: string;
            }
          | undefined
      ) => void)
    | undefined = (response) => {
    const facebookToken = response?.accessToken;
    const facebookId = response?.userID;
    if (facebookToken && facebookId) {
      dispatch(
        login({ facebookToken, facebookId, provider: FACEBOOK_PROVIDER })
      );
    }
  };
  const onFail: ((err: { status: string }) => void) | undefined = (error) => {
    dispatch(
      alertActions.updateAlert({ name: ERROR_ALERT, message: error.status })
    );
  };
  return (
    <FacebookLogin
      style={styleFacebookLogin}
      appId={FACEBOOK_APP_ID}
      onSuccess={onSuccess}
      onFail={onFail}
    >
      {props.children}
    </FacebookLogin>
  );
};

const FacebookLoginWrap = React.memo(MFacebookLoginWrap);
export { FacebookLoginWrap };

const styleFacebookLogin: CSS.Properties = {
  border: "none",
  background: "none",
};
