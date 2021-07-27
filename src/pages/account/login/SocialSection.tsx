import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import CSS from "csstype";
import Link from "next/link";
import { AuthContext } from "../../../store/AuthContext";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";

const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const SocialContainer = styled.div`
  border-top: 1px solid ${(props) => props.theme.secondaryColor};
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SocialButtonTitle = styled.h2`
  margin: 10px auto 30px auto;
  color: ${(props) =>
    props.theme.id === "light" ? "rgba(0, 0, 0, 0.3)" : "white"};
  font-size: 1rem;
`;

const KakaoLogin = styled.button`
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
  color: #3c1d1e;
  font-size: 2.5rem;
`;
const FacebookLogin = styled(KakaoLogin)`
  color: white;
  background: #3d5a97;
`;

const SocialSection: React.FC = (props) => {
  const router = useRouter();
  const redirectUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/account/oauth"
      : "https://chaw-chaw.vercel.app/account/oauth";
  const callKakaoLogin = () => {
    router.push({
      pathname: "https://kauth.kakao.com/oauth/authorize",
      query: {
        response_type: "code",
        client_id: "0c867f53d75cc0e2a7932427b908806b",
        redirect_uri: redirectUrl,
      },
    });
  };
  return (
    <SocialContainer>
      <SocialButtonTitle>소셜계정으로 로그인 | 회원가입</SocialButtonTitle>
      <ButtonSection>
        <KakaoLogin onClick={callKakaoLogin}>
          <RiKakaoTalkFill />
        </KakaoLogin>
        <FacebookLogin
        //   style={styleFacebookLogin}
        //   appId="1235018336951383"
        //   onSuccess={(response) => {
        //     console.log(response, "Login Success!");
        //     //console.log("id: ", response.id);
        //   }}
        //   onFail={(error) => {
        //     console.log("Login Failed!");
        //     console.log("status: ", error.status);
        //   }}
        //   onProfileSuccess={(response) => {
        //     console.log(response, "Get Profile Success!");
        //   }}
        >
          <FaFacebookF />
        </FacebookLogin>
      </ButtonSection>
    </SocialContainer>
  );
};

export default SocialSection;
