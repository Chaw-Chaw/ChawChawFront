import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Button, Divider } from "../common";
import KaKaoLogin from "react-kakao-login";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { styleSocialLogin } from "../common";
import CSS from "csstype";

interface LoginTypeModalProps {
  visible: boolean;
}

const Container = styled.div<{ visible?: boolean }>`
  width: 500px;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  display: ${(props) => (props.visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 100px 50px;
  z-index: 200;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 50px;
`;

const ButtonSection = styled.div`
  width: 100%;
  margin: 10px;
`;
const styleKakaoLogin: CSS.Properties = {
  ...styleSocialLogin,
  background: "#FEE100",
  marginBottom: "10px",
};

const styleFacebookLogin: CSS.Properties = {
  ...styleSocialLogin,
  background: "#3577E5",
};

const NormalSignupButton = styled(Button)`
  width: 100%;
  height: 60px;
  font-size: 1rem;
  border-radius: 1rem;
`;

const SignupTypeModal: React.FC<LoginTypeModalProps> = (props) => {
  return (
    <Container visible={props.visible}>
      <Title>회원가입 방법을 선택해주세요.</Title>
      <Divider width="100%" color="rgba(0,0,0,0.2)" />
      <ButtonSection>
        <Link href="/account/signup">
          <a>
            <NormalSignupButton>개인 계정</NormalSignupButton>
          </a>
        </Link>
      </ButtonSection>
      <KaKaoLogin
        style={styleKakaoLogin}
        token="0c867f53d75cc0e2a7932427b908806b"
        onSuccess={() => {
          console.log("kakakoLogin");
        }}
        onFail={() => {
          console.error("Login failed.");
        }}
      >
        KaKao
      </KaKaoLogin>
      <FacebookLogin
        style={styleFacebookLogin}
        appId="1088597931155576"
        onSuccess={(response) => {
          console.log("Login Success!");
          //console.log("id: ", response.id);
        }}
        onFail={(error) => {
          console.log("Login Failed!");
          console.log("status: ", error.status);
        }}
        onProfileSuccess={(response) => {
          console.log("Get Profile Success!");
        }}
      >
        Facebook
      </FacebookLogin>
    </Container>
  );
};

export { SignupTypeModal };
