import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import {
  Layout,
  Input,
  PasswordInput,
  Label,
  Button,
} from "../../../components/common/";
import AccountContainer from "../../../components/account/AccountContainer";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../../../store/AuthContext";
import SocialSection from "./SocialSection";
import Link from "next/link";
import { useAlert } from "react-alert";
type Inputs = {
  email: string;
  password: string;
};

const InputSection = styled.div`
  width: 100%;
  margin: 10px 0px;
`;
const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const LoginButton = styled(Button)`
  width: 100%;
  height: 60px;
  font-size: 1rem;
  border-radius: 1rem;
`;

const Form = styled.form`
  width: 70%;
  @media (max-width: 500px) {
    width: 320px;
  }
`;

const RequiredText = styled.span`
  color: ${(props) => props.theme.primaryColor};
  font-size: 0.8rem;
`;

const SignupBox = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a {
    color: ${(props) => props.theme.primaryColor};
    text-decoration: none;
    font-weight: 900;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const SignupTitle = styled.h2`
  margin: 0px;
  margin-right: 5px;
  color: ${(props) =>
    props.theme.id === "light" ? "rgba(0, 0, 0, 0.3)" : "white"};
  font-size: 1rem;
`;
export default function Login() {
  const message = useAlert();
  const { login, kakaoLogin } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.email === "" || data.password === "") {
      message.error("입력칸을 모두 입력해주세요.");
      return;
    }
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
          </ButtonSection>
          <SignupBox>
            <SignupTitle>아직 회원이 아니신가요? </SignupTitle>
            <Link href="/account/signup/webMailAuth">
              <a>이메일 회원가입</a>
            </Link>
          </SignupBox>
          <SocialSection />
        </Form>
      </AccountContainer>
    </Layout>
  );
}
