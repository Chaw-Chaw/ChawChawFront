import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Layout,
  Header,
  Input,
  PasswordInput,
  Label,
  Button,
  styleSocialLogin,
} from "../../../components/common/";
import AccountContainer from "../../../components/account/AccountContainer";
import styled from "styled-components";
import KaKaoLogin from "react-kakao-login";
import FacebookLogin from "@greatsumini/react-facebook-login";
import CSS from "csstype";
import Link from "next/link";
import KakaoLogin from "react-kakao-login";
import axios from "axios";

const InputSection = styled.div`
  width: 100%;
  margin: 10px 0;
`;
const ButtonSection = styled.div`
  width: 100%;
  display: flex;
`;

const styleKakaoLogin: CSS.Properties = {
  ...styleSocialLogin,
  background: "#FEE100",
  margin: "0px 5px",
};

const styleFacebookLogin: CSS.Properties = {
  ...styleSocialLogin,
  background: "#3577E5",
};

const LoginButton = styled(Button)`
  width: 100%;
  height: 60px;
  font-size: 1rem;
  border-radius: 1rem;
`;

export default function Login() {
  const router = useRouter();
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
          <LoginButton
            onClick={() => {
              axios
                .post(
                  "url",
                  {
                    contact: "Sewon",
                    email: "sewon@gmail.com",
                  },
                  {
                    headers: {
                      "Content-type": "application/json",
                      Accept: "application/json",
                    },
                  }
                )
                .then((response) => {
                  console.log(response.data);
                })
                .catch((response) => {
                  console.log(response.data);
                });
              router.push("/post");
            }}
          >
            Login
          </LoginButton>
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
