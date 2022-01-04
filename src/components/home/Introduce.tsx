import styled from "styled-components";
import CSS from "csstype";
import { useRouter } from "next/router";
import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { FaFacebookF } from "react-icons/fa";
import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineLogin } from "react-icons/ai";
import { KAKAO_OAUTH_REDIRECT_URL } from "../../constants";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { Button } from "../common";
import Typed from "react-typed";
import { LOGIN_PAGE_URL, POST_PAGE_URL } from "../../constants/pageUrls";
import { FacebookLoginWrap } from "../common/FacebookLoginWrap";
import { useAppSelector } from "../../hooks/redux";

const MIntroduce: React.FC = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const [viewLoginSection, setViewLoginSection] = useState(false);
  const router = useRouter();

  const callKakaoLogin = () => {
    // next js 공식 문서에 따르면 외부 페이지 이용시 router를 사용할 필요가 없다.
    window.location.href = KAKAO_OAUTH_REDIRECT_URL;
  };

  const handleClickKakaoBtn: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    callKakaoLogin();
  };

  const handleClickLoginBtn: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    router.push(LOGIN_PAGE_URL);
  };

  const handleClickMovePost: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push(POST_PAGE_URL);
  };

  useEffect(() => {
    if (isLogin) setViewLoginSection(false);
    else setViewLoginSection(true);
  }, [isLogin]);

  const loginSection = (
    <LoginIconContainer>
      <KakaoIconBox onClick={handleClickKakaoBtn}>
        <BiMessageRounded />
      </KakaoIconBox>
      <FacebookLoginWrap>
        <FacebookIconBox>
          <FaFacebookF />
        </FacebookIconBox>
      </FacebookLoginWrap>
      <LoginIconBox onClick={handleClickLoginBtn}>
        <AiOutlineLogin />
      </LoginIconBox>
    </LoginIconContainer>
  );

  const movePostPageSection = (
    <MovePostPageButton onClick={handleClickMovePost}>
      우리학교 바로가기
    </MovePostPageButton>
  );

  return (
    <>
      <IntroduceContainer>
        <IntroduceInner>
          <IntroduceLogoTitle>ChawChaw 🗣</IntroduceLogoTitle>
          <IntroduceTitle>어려웠던 외국인 친구 🧑🏿👩🏼</IntroduceTitle>
          <IntroduceTitle>우리학교 버디 ChawChaw와 함께하자!</IntroduceTitle>
          {viewLoginSection ? loginSection : movePostPageSection}
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
const Introduce = React.memo(MIntroduce);
export { Introduce };

const IntroduceContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100vh;
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
`;

const IntroduceInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
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
    margin-top: 50px;
  }
  @media (max-width: 768px) {
    margin-top: 50px;
    margin-bottom: 20px;
  }
`;

const LoginIconContainer = styled.div`
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

const KakaoIconBox = styled(IconBox)``;
const FacebookIconBox = styled(IconBox)``;
const LoginIconBox = styled(IconBox)``;

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
