import React, { useEffect } from "react";

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
import SocialSection from "../../../components/account/SocialSection";
import Link from "next/link";
import {
  BASIC_PROVIDER,
  ERROR_ALERT,
  ERROR_ENTER_LOGINPAGE_MSG,
  LOGIN_PAGE_SUBTITLE,
  LOGIN_PAGE_TITLE,
  SIGNUP_WEBMAIL_AUTH_PAGE_URL,
  WARNING_FORM_MSG,
} from "../../../constants";
import { useAppDispatch } from "../../../hooks/redux";

import { alertActions } from "../../../store/alertSlice";
import { CONFIRM_PUSH_POSTPAGE, WARNING_ALERT } from "../../../constants/alert";
import { isLogin } from "../../../utils";
import { login } from "../../../store/actions/authActions";

interface Inputs {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.email === "" || data.password === "") {
      dispatch(
        alertActions.updateAlert({
          name: WARNING_ALERT,
          message: WARNING_FORM_MSG,
        })
      );
      return;
    }
    dispatch(
      login({
        email: data.email,
        password: data.password,
        provider: BASIC_PROVIDER,
      })
    );
  };

  const emailSection = (
    <InputSection>
      <Label htmlFor="email" tag="필수">
        이메일
      </Label>
      <Input
        id="email"
        placeholder="example@address.com"
        {...register("email", {
          pattern:
            /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
        })}
      />
      {errors.email && <RequiredText>이메일 형식을 맞춰주세요.</RequiredText>}
    </InputSection>
  );

  const passwordSection = (
    <InputSection>
      <Label htmlFor="password" tag="필수">
        비밀번호
      </Label>
      <PasswordInput
        id="password"
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
  );

  useEffect(() => {
    if (isLogin()) {
      dispatch(
        alertActions.updateAlert({
          name: ERROR_ALERT,
          message: ERROR_ENTER_LOGINPAGE_MSG,
          confirmFuncName: CONFIRM_PUSH_POSTPAGE,
        })
      );
    }
  }, [dispatch]);

  return (
    <Layout>
      <AccountContainer title={LOGIN_PAGE_TITLE} subtitle={LOGIN_PAGE_SUBTITLE}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {emailSection}
          {passwordSection}
          <ButtonSection>
            <LoginButton type="submit">Login</LoginButton>
          </ButtonSection>
        </Form>
        <SignupBox>
          <SignupTitle>아직 회원이 아니신가요? </SignupTitle>
          <Link href={SIGNUP_WEBMAIL_AUTH_PAGE_URL}>
            <a>이메일 회원가입</a>
          </Link>
        </SignupBox>
        <SocialSection />
      </AccountContainer>
    </Layout>
  );
}

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
  margin-top: 20px;
  margin-bottom: 10px;
  width: 320px;
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
  padding: 0px;
  margin: 0px;
  width: 160px;
  margin-right: 5px;
  color: ${(props) =>
    props.theme.id === "light" ? "rgba(0, 0, 0, 0.3)" : "white"};
  font-size: 1rem;
`;
