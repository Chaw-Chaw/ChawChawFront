import FacebookLogin from "@greatsumini/react-facebook-login";
import { FACEBOOK_APP_ID } from "../../constants";
import { useLogin } from "../../hooks/api/account/useLogin";
import CSS from "csstype";

const FacebookLoginWrap: React.FC = (props) => {
  const { login } = useLogin();
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
      login({ facebookToken, facebookId, provider: "facebook" });
    }
  };
  const onFail: ((err: { status: string }) => void) | undefined = (error) => {
    console.log("status: ", error.status);
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

export { FacebookLoginWrap };

const styleFacebookLogin: CSS.Properties = {
  border: "none",
  background: "none",
};
