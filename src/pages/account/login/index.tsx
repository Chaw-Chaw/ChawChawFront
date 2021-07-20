import React, { useState } from "react";
import {
  Layout,
  Header,
  Input,
  PasswordInput,
  Label,
  Button,
  styleSocialLogin,
} from "../../../components/common/";
import AccountContainer from "../components/AccountContainer";
import styled from "styled-components";
import KaKaoLogin from "react-kakao-login";
import FacebookLogin from "@greatsumini/react-facebook-login";
import CSS from "csstype";
import Link from "next/link";

const InputSection = styled.div`
  width: 100%;
  margin: 10px 0;
`;
const ButtonSection = styled.div`
  width: 100%;
`;

const styleKakaoLogin: CSS.Properties = {
  ...styleSocialLogin,
  background: "#FEE100",
  margin: "0px",
  marginTop: "10px",
};

const styleFacebookLogin: CSS.Properties = {
  ...styleSocialLogin,
  background: "#3577E5",
  margin: "0px",
  marginTop: "10px",
};

export default function Login() {
  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen((open) => !open);
    console.log(open);
  };
  return (
    <Layout type="login">
      <AccountContainer
        title="ChawChaw에`로그인 해주세요."
        subtitle="아이디와 비밀번호를 입력해주세요."
      >
        <InputSection>
          <Label htmlFor="id" tag="필수">
            아이디
          </Label>
          <Input name="id" />
        </InputSection>
        <InputSection>
          <Label htmlFor="password" tag="필수">
            비밀번호
          </Label>
          <PasswordInput name="password" />
        </InputSection>
        <ButtonSection>
          <Link href="/post">
            <a>
              <Button
                width="100%"
                height="4rem"
                fontSize="1rem"
                onClick={handleModal}
              >
                Login
              </Button>
            </a>
          </Link>
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
        </ButtonSection>
      </AccountContainer>
    </Layout>
  );
}
