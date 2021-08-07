import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import CSS from "csstype";
import Link from "next/link";
import { AuthContext } from "../../../store/AuthContext";
import { RiKakaoTalkFill } from "react-icons/ri";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FaFacebookF } from "react-icons/fa";
import axios from "axios";

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
// const FacebookLogin = styled(KakaoLogin)`
//   color: white;
//   background: #3d5a97;
// `;
const styleFacebookLogin: CSS.Properties = {
  cursor: "pointer",
  width: "60px",
  height: "60px",
  border: "none",
  boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.5)",
  borderRadius: "100%",
  margin: "0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#3d5a97",
  color: "white",
  fontSize: "2.5rem",
};

const SocialSection: React.FC = (props) => {
  const router = useRouter();
  const { facebookLogin } = useContext(AuthContext);
  const redirectUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/account/oauth"
      : "https://chawchaw.vercel.app/account/oauth";

  const callKakaoLogin = () => {
    router.push({
      pathname: "https://kauth.kakao.com/oauth/authorize",
      query: {
        response_type: "code",
        client_id: "de32392365a519fc6df93e6196a5ad6b",
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
          style={styleFacebookLogin}
          appId="1235018336951383"
          onSuccess={(response) => {
            console.log(response, "Login Success!");
            const accessToken = response?.accessToken;
            const email = response?.userID;
            if (accessToken && email) {
              facebookLogin({ accessToken, email });
            }
            //console.log("id: ", response.id);
          }}
          onFail={(error) => {
            console.log("Login Failed!");
            console.log("status: ", error.status);
          }}
          onProfileSuccess={(response) => {
            console.log(response, "Get Profile Success!");
          }}
        >
          <FaFacebookF />
        </FacebookLogin>
      </ButtonSection>
    </SocialContainer>
  );
};

export default SocialSection;
