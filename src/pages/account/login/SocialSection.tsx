import { useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import CSS from "csstype";
import { AuthContext } from "../../../store/AuthContext";
import { RiKakaoTalkFill } from "react-icons/ri";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FaFacebookF } from "react-icons/fa";
import {
  DEVELOPMENT_OAUTH_URL,
  FACEBOOK_APP_ID,
  KAKAO_CLIENT_ID,
  KAKAO_OAUTH_URL,
  PRODUCT_OAUTH_URL,
} from "../../../constants";

const SocialSection: React.FC = () => {
  const router = useRouter();
  const { facebookLogin } = useContext(AuthContext);
  const redirectUrl =
    process.env.NODE_ENV === "development"
      ? DEVELOPMENT_OAUTH_URL
      : PRODUCT_OAUTH_URL;

  const callKakaoLogin = () => {
    router.push({
      pathname: KAKAO_OAUTH_URL,
      query: {
        response_type: "code",
        client_id: KAKAO_CLIENT_ID,
        redirect_uri: redirectUrl,
      },
    });
  };

  return (
    <SocialContainer>
      <SocialButtonTitle>소셜계정으로 로그인 | 회원가입</SocialButtonTitle>
      <ButtonSection>
        <KakaoLogin
          onClick={(e) => {
            e.preventDefault();
            callKakaoLogin();
          }}
        >
          <RiKakaoTalkFill />
        </KakaoLogin>
        <FacebookLogin
          style={styleFacebookLogin}
          appId={FACEBOOK_APP_ID}
          onSuccess={(response) => {
            console.log(response, "Login Success!");
            const facebookToken = response?.accessToken;
            const facebookId = response?.userID;
            if (facebookToken && facebookId) {
              facebookLogin({ facebookToken, facebookId });
            }
            //console.log("id: ", response.id);
          }}
          onFail={(error) => {
            console.log("Login Failed!");
            console.log("status: ", error.status);
          }}
        >
          <IconBox>
            <FaFacebookF />
          </IconBox>
        </FacebookLogin>
      </ButtonSection>
    </SocialContainer>
  );
};

export default SocialSection;

const IconBox = styled.div`
  cursor: pointer;
  width: 60px;
  height: 60px;
  border: none;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  border-radius: 100%;
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3d5a97;
  svg {
    color: white;
    font-size: 2.5rem;
  }
`;

const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const SocialContainer = styled.div`
  border-top: 1px solid ${(props) => props.theme.secondaryColor};
  margin-top: 10px;
  width: 70%;
  @media (max-width: 500px) {
    width: 320px;
  }
  display: flex;
  flex-direction: column;
`;

const SocialButtonTitle = styled.h2`
  margin: 10px auto 30px auto;
  color: ${(props) =>
    props.theme.id === "light" ? "rgba(0, 0, 0, 0.3)" : "white"};
  font-size: 1rem;
`;

const KakaoLogin = styled.div`
  cursor: pointer;
  width: 60px;
  height: 60px;
  border: none;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  border-radius: 100%;
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fae100;
  svg {
    font-size: 2.5rem;
    color: #3c1d1e;
  }
`;

const styleFacebookLogin: CSS.Properties = {
  border: "none",
  background: "none",
};
