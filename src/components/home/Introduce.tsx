import styled from "styled-components";
import CSS from "csstype";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import { FaFacebookF } from "react-icons/fa";
import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineLogin } from "react-icons/ai";
import {
  FACEBOOK_APP_ID,
  KAKAO_CLIENT_ID,
  KAKAO_OAUTH_URL,
  REDIRECT_URL,
} from "../../constants";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { Button } from "../common";
import Typed from "react-typed";

const Introduce: React.FC = () => {
  const { isLogin, login } = useContext(AuthContext);
  const [viewLoginSection, setViewLoginSection] = useState(false);
  const router = useRouter();

  const callKakaoLogin = () => {
    router.push({
      pathname: KAKAO_OAUTH_URL,
      query: {
        response_type: "code",
        client_id: KAKAO_CLIENT_ID,
        redirect_uri: REDIRECT_URL,
      },
    });
  };

  useEffect(() => {
    console.log(isLogin, viewLoginSection, "뭔데이거");
    if (isLogin) setViewLoginSection(false);
    else setViewLoginSection(true);
  }, [isLogin]);

  return (
    <>
      <IntroduceContainer>
        <IntroduceInner>
          <IntroduceLogoTitle>ChawChaw 🗣</IntroduceLogoTitle>
          <IntroduceTitle>어려웠던 외국인 친구 🧑🏿👩🏼</IntroduceTitle>
          <IntroduceTitle>우리학교 버디 ChawChaw와 함께하자!</IntroduceTitle>
          {viewLoginSection ? (
            <LoginIconBox>
              <IconBox
                onClick={(e) => {
                  e.preventDefault();
                  callKakaoLogin();
                }}
              >
                <BiMessageRounded />
              </IconBox>
              <FacebookLogin
                style={styleFacebookLogin}
                appId={FACEBOOK_APP_ID}
                onSuccess={(response) => {
                  console.log(response, "Login Success!");
                  const facebookToken = response?.accessToken;
                  const facebookId = response?.userID;
                  if (facebookToken && facebookId) {
                    login({ facebookToken, facebookId, provider: "facebook" });
                  }
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
              <IconBox
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/account/login");
                }}
              >
                <AiOutlineLogin />
              </IconBox>
            </LoginIconBox>
          ) : (
            <MovePostPageButton
              onClick={(e) => {
                e.preventDefault();
                router.push("/post");
              }}
            >
              우리학교 바로가기
            </MovePostPageButton>
          )}
          <GuideBox>
            <MyMessageBalloon>
              <Typed
                strings={["안녕하세요!", "Long time no see"]}
                typeSpeed={40}
                backSpeed={50}
                loop
              />
            </MyMessageBalloon>
            <ScrollingText>Usage ⬇️</ScrollingText>
            <YourMessageBalloon>
              <Typed
                strings={["Ich vermisse dich", "ご飯食べに行こう"]}
                typeSpeed={40}
                backSpeed={50}
                loop
              />
            </YourMessageBalloon>
          </GuideBox>
        </IntroduceInner>
      </IntroduceContainer>
    </>
  );
};

export { Introduce };

const IntroduceContainer = styled.div`
  box-sizing: border-box;
  padding-top: 80px;
  display: flex;
  width: 100%;
  height: 100vh;
`;

const IntroduceInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IntroduceTitle = styled.h1`
  width: 100%;
  font-size: 50px;
  margin: 15px 0px;
  text-align: center;
  @media (max-width: 480px) {
    margin: 5px 0px;
    font-size: 2.2rem;
  }
`;

const IntroduceLogoTitle = styled.h3`
  margin-top: 100px;
  text-align: center;
  margin-bottom: 50px;
  font-size: 1.5rem;
  color: ${(props) =>
    props.theme.id === "light" ? "black" : "rgba(255,255,255,0.8)"};
  @media (max-width: 1024px) {
    margin-top: 20px;
  }
  @media (max-width: 768px) {
    margin-top: 0px;
    margin-bottom: 20px;
  }
`;

const LoginIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 45px;
  margin-bottom: 40px;
  width: 300px;
  min-height: 40px;
`;

const MovePostPageButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 45px;
  margin-bottom: 40px;
  width: 160px;
  min-height: 40px;
  background-color: #eeeeee;
  color: #333333;
  border-radius: 15px;
`;

const IconBox = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border: none;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  border-radius: 100%;
  margin: 0px 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eeeeee;
  svg {
    font-size: 1.2rem;
    color: #333333;
  }
  transition: background-color 0.5s;
  :hover {
    background-color: ${(props) => props.theme.primaryColor};
    svg {
      color: white;
    }
  }
`;

const styleFacebookLogin: CSS.Properties = {
  border: "none",
  background: "none",
};

const GuideBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.primaryColor};
`;

const MyMessageBalloon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20px;
  left: 50px;
  width: 400px;
  height: 100px;
  background-color: white;
  border-radius: 30px;
  border-top-left-radius: 0px;
  font-size: 2.5rem;
  color: black;
  @media (max-width: 480px) {
    width: 300px;
    height: 75px;
    font-size: 1.8rem;
    left: 10px;
    top: 50px;
  }
`;

const YourMessageBalloon = styled(MyMessageBalloon)`
  left: initial;
  top: 130px;
  right: 50px;
  border-radius: 30px;
  border-top-right-radius: 0px;
  font-family: sans-serif;
  @media (max-width: 480px) {
    right: 10px;
    top: 180px;
  }
`;

const ScrollingText = styled.span`
  margin-bottom: 50px;
  text-align: center;
  font-size: 3rem;
  text-shadow: 1px 1px 2px ${(props) => props.theme.primaryColor};
  font-weight: 800;
  width: 100%;
  color: white;
  @keyframes slide-top {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(100px);
    }
    100% {
      transform: translateY(0);
    }
  }
  animation: slide-top 2s infinite;

  @media (max-width: 1100px) {
    display: none;
  }
`;
