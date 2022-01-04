import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Layout,
  Input,
  Label,
  Button,
  PasswordInput,
} from "../../../components/common/";
import AccountContainer from "../../../components/account/AccountContainer";
import SignupOrder from "../../../components/account/SignupOrder";
import styled from "styled-components";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  BASIC_PROVIDER,
  CONFIRM_PUSH_LOGINPAGE,
  CONFIRM_PUSH_POSTPAGE,
  CONFIRM_PUSH_SIGNUP_WEBMAIL,
  ERROR_AFTERLOGOUT_SIGNUP_MSG,
  ERROR_ALERT,
  LOGIN_PAGE_URL,
  POST_PAGE_URL,
  SIGNUP_WEBMAIL_AUTH_PAGE_URL,
  WARNING_ALERT,
  WARNING_WEBMAIL_VERIFY_MSG,
  WARNING_FORM_MSG,
  WARNING_ENTER_EMAIL_MSG,
  WARNING_DUPEMAIL_CHECK_MSG,
  ERROR_EMPTY_USERDATA_MSG,
} from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { alertActions } from "../../../store/alertSlice";
import {
  authActions,
  signup,
  emailDuplicationCheck,
} from "../../../store/authSlice";
import { isLogin, newError } from "../../../utils";

interface Inputs {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUp() {
  const [isEmailDupCheck, setIsEmailDupCheck] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const userSchool = user.school;
  const dispatch = useAppDispatch();

  const userUniversity = user.school;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (
      data.email === "" ||
      data.username === "" ||
      data.password === "" ||
      data.passwordConfirm === ""
    ) {
      dispatch(
        alertActions.updateAlert({
          name: WARNING_ALERT,
          message: WARNING_FORM_MSG,
        })
      );
      return;
    }
    if (!isEmailDupCheck) {
      dispatch(
        alertActions.updateAlert({
          name: WARNING_ALERT,
          message: WARNING_DUPEMAIL_CHECK_MSG,
        })
      );
      return;
    }
    if (userUniversity === "") {
      dispatch(
        alertActions.updateAlert({
          name: WARNING_ALERT,
          message: WARNING_WEBMAIL_VERIFY_MSG,
          confirmFuncName: CONFIRM_PUSH_LOGINPAGE,
        })
      );
      return;
    }

    dispatch(
      authActions.updateUser({
        email: data.email,
        name: data.username,
      })
    );

    if (user.web_email && user.school) {
      dispatch(
        signup({
          email: data.email,
          password: data.password,
          name: data.username,
          web_email: user.web_email,
          school: user.school,
          imageUrl: "",
          provider: BASIC_PROVIDER,
        })
      );
    } else {
      dispatch(
        alertActions.updateAlert({
          name: ERROR_ALERT,
          message: ERROR_EMPTY_USERDATA_MSG,
        })
      );
      return;
    }
  };

  const emailDupCheck = async () => {
    const email = watch("email");
    if (email !== "") {
      try {
        await dispatch(emailDuplicationCheck(email));
        setIsEmailDupCheck(true);
      } catch (err) {
        setIsEmailDupCheck(false);
      }

      // 중복된 이메일이 있으면 사용자가 회원가입이 불가능
    } else {
      dispatch(
        alertActions.updateAlert({
          name: WARNING_ALERT,
          message: WARNING_ENTER_EMAIL_MSG,
        })
      );
      return;
    }
  };

  const handleClickEmailChkBtn: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    emailDupCheck();
  };

  useEffect(() => {
    if (isLogin()) {
      dispatch(
        alertActions.updateAlert({
          name: ERROR_ALERT,
          message: ERROR_AFTERLOGOUT_SIGNUP_MSG,
          confirmFuncName: CONFIRM_PUSH_POSTPAGE,
        })
      );
      return;
    }

    if (!userSchool) {
      dispatch(
        alertActions.updateAlert({
          name: ERROR_ALERT,
          message: WARNING_WEBMAIL_VERIFY_MSG,
          confirmFuncName: CONFIRM_PUSH_SIGNUP_WEBMAIL,
        })
      );
      return;
    }
  }, [dispatch, userSchool]);

  const emailSection = (
    <InputSection>
      <Label htmlFor="email">이메일</Label>
      <EmailInputBox>
        <Input
          placeholder="example@address.com"
          {...register("email", {
            pattern:
              /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
          })}
        />
        <EmailDuplicationCheckButton onClick={handleClickEmailChkBtn}>
          중복검사
        </EmailDuplicationCheckButton>
      </EmailInputBox>
      {errors.email && <RequiredText>이메일 형식을 맞춰주세요.</RequiredText>}
    </InputSection>
  );

  const nameSection = (
    <InputSection>
      <Label htmlFor="username">이름</Label>
      <Input {...register("username")} />
    </InputSection>
  );

  const passwordSection = (
    <InputSection>
      <Label htmlFor="password">비밀번호</Label>
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
  );

  const confirmPasswordSection = (
    <InputSection>
      <Label htmlFor="passwordConfirm" tag="확인">
        비밀번호
      </Label>
      <PasswordInput
        name="passwordConfirm"
        register={{
          ...register("passwordConfirm", {
            pattern:
              /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
          }),
        }}
      />
      {watch("password") !== watch("passwordConfirm") && (
        <RequiredText>입력하신 비밀번호와 같지 않습니다.</RequiredText>
      )}
    </InputSection>
  );

  const movePageButtonSection = (
    <MovePageButtonSection>
      <ButtonSection marginRight="20px">
        <Link href={SIGNUP_WEBMAIL_AUTH_PAGE_URL}>
          <a>
            <Button secondary width="100%" height="4rem" fontSize="1rem">
              웹메일 인증
            </Button>
          </a>
        </Link>
      </ButtonSection>
      <ButtonSection marginLeft="20px">
        <Button type="submit" width="100%" height="4rem" fontSize="1rem">
          회원가입
        </Button>
      </ButtonSection>
    </MovePageButtonSection>
  );

  return (
    <Layout>
      <AccountContainer
        title="회원 정보 입력"
        subtitle="ChawChaw에서 사용할 정보를 입력해주세요.` 이메일 / 비밀번호"
      >
        <SignupOrder activeType="2" />
        <Form onSubmit={handleSubmit(onSubmit)}>
          {emailSection}
          {nameSection}
          {passwordSection}
          {confirmPasswordSection}
          <InputSection>
            <Label htmlFor="university" tag="필수">
              소속학교
            </Label>
            <Input name="university" disabled defaultValue={userUniversity} />
          </InputSection>
          {movePageButtonSection}
        </Form>
      </AccountContainer>
    </Layout>
  );
}

const InputSection = styled.div`
  width: 100%;
  margin: 10px 0;
`;

const ButtonSection = styled.div<{ marginRight?: string; marginLeft?: string }>`
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "0px")};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : "0px")};
  width: 100%;
`;

const MovePageButtonSection = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
`;

const EmailInputBox = styled.div`
  display: flex;
  align-items: center;
`;

const EmailDuplicationCheckButton = styled(Button)`
  margin: 0px 0px 8px 5px;
  height: 40px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const Form = styled.form`
  width: 100%;
`;
const RequiredText = styled.span`
  color: ${(props) => props.theme.primaryColor};
  font-size: 0.8rem;
`;
