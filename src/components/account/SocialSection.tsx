import React, { MouseEventHandler } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import CSS from "csstype";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import {
  KAKAO_CLIENT_ID,
  KAKAO_OAUTH_URL,
  REDIRECT_URL,
} from "../../constants";
import { FacebookLoginWrap } from "../common/FacebookLoginWrap";

const SocialSection: React.FC = () => {
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

  const handleClickKaKaoBtn: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    callKakaoLogin();
  };

  return (
    <SocialContainer>
      <SocialButtonTitle>소셜계정으로 로그인 | 회원가입</SocialButtonTitle>
      <ButtonSection>
        <KakaoLogin onClick={handleClickKaKaoBtn}>
          <RiKakaoTalkFill />
        </KakaoLogin>
        <FacebookLoginWrap>
          <FacebookIconBox>
            <FaFacebookF />
          </FacebookIconBox>
        </FacebookLoginWrap>
      </ButtonSection>
    </SocialContainer>
  );
};

export default React.memo(SocialSection);

const FacebookIconBox = styled.div`
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
