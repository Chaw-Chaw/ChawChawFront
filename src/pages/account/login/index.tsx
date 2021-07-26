import React, { useContext, useState } from "react";
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
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../../../store/AuthContext";

type Inputs = {
  email: string;
  password: string;
};

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

const Form = styled.form`
  width: 100%;
`;

const RequiredText = styled.span`
  color: ${(props) => props.theme.primaryColor};
  font-size: 0.8rem;
`;

export default function Login() {
  const { login, kakaoLogin } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    login(data);
  };
  return (
    <Layout type="login">
      <AccountContainer
        title="ChawChaw에`로그인 해주세요."
        subtitle="아이디와 비밀번호를 입력해주세요."
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputSection>
            <Label htmlFor="email" tag="필수">
              이메일
            </Label>
            <Input
              placeholder="example@address.com"
              {...register("email", {
                pattern:
                  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
              })}
            />
            {errors.email && (
              <RequiredText>이메일 형식을 맞춰주세요.</RequiredText>
            )}
          </InputSection>
          <InputSection>
            <Label htmlFor="password" tag="필수">
              비밀번호
            </Label>
            <PasswordInput
              name="password"
              register={{
                ...register("password", {
                  pattern:
                    /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                }),
              }}
            />
            {errors.password && (
              <RequiredText>
                비밀번호 형식은 특수문자/문자/숫자 조합 8 ~ 15 글자 입니다.
              </RequiredText>
            )}
          </InputSection>
          <ButtonSection>
            <LoginButton type="submit">Login</LoginButton>
            <KaKaoLogin
              style={styleKakaoLogin}
              token="0c867f53d75cc0e2a7932427b908806b"
              onSuccess={(data) => {
                if (data.profile) {
                  kakaoLogin(data.profile.kakao_account);
                } else {
                  console.log(data, "profile 데이터가 없습니다.");
                }
              }}
              onFail={() => {
                console.error("KaKao Login failed.");
              }}
            >
              KaKao
            </KaKaoLogin>
            <FacebookLogin
              style={styleFacebookLogin}
              appId="1235018336951383"
              onSuccess={(response) => {
                console.log(response, "Login Success!");
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
              Facebook
            </FacebookLogin>
          </ButtonSection>
        </Form>
      </AccountContainer>
    </Layout>
  );
}
