import React, { MouseEventHandler, useEffect, useState } from "react";
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
import { authActions } from "../../../store/authSlice";
import { isLogin } from "../../../utils";
import { SignupInputs } from "../../../types/account";
import {
  emailDuplicationCheck,
  signup,
} from "../../../store/actions/authActions";
import { asyncErrorHandle } from "../../../store/actions/alertActions";

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
  } = useForm<SignupInputs>();

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
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

    try {
      if (user.web_email && user.school) {
        await dispatch(
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
    } catch (error) {
      dispatch(asyncErrorHandle(error));
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
        dispatch(asyncErrorHandle(err));
      }

      // ????????? ???????????? ????????? ???????????? ??????????????? ?????????
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

  const handleClickEmailChkBtn: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    await emailDupCheck();
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
      <Label htmlFor="email">?????????</Label>
      <EmailInputBox>
        <Input
          placeholder="example@address.com"
          {...register("email", {
            pattern:
              /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
          })}
        />
        <EmailDuplicationCheckButton onClick={handleClickEmailChkBtn}>
          ????????????
        </EmailDuplicationCheckButton>
      </EmailInputBox>
      {errors.email && <RequiredText>????????? ????????? ???????????????.</RequiredText>}
    </InputSection>
  );

  const nameSection = (
    <InputSection>
      <Label htmlFor="username">??????</Label>
      <Input id="username" {...register("username")} />
    </InputSection>
  );

  const passwordSection = (
    <InputSection>
      <Label htmlFor="password">????????????</Label>
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
          ???????????? ????????? ????????????/??????/?????? ?????? 8 ~ 15 ?????? ?????????.
        </RequiredText>
      )}
    </InputSection>
  );

  const confirmPasswordSection = (
    <InputSection>
      <Label htmlFor="passwordConfirm" tag="??????">
        ????????????
      </Label>
      <PasswordInput
        id="passwordConfirm"
        name="passwordConfirm"
        register={{
          ...register("passwordConfirm", {
            pattern:
              /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
          }),
        }}
      />
      {watch("password") !== watch("passwordConfirm") && (
        <RequiredText>???????????? ??????????????? ?????? ????????????.</RequiredText>
      )}
    </InputSection>
  );

  const movePageButtonSection = (
    <MovePageButtonSection>
      <ButtonSection marginRight="20px">
        <Link href={SIGNUP_WEBMAIL_AUTH_PAGE_URL}>
          <a>
            <Button secondary width="100%" height="4rem" fontSize="1rem">
              ????????? ??????
            </Button>
          </a>
        </Link>
      </ButtonSection>
      <ButtonSection marginLeft="20px">
        <Button type="submit" width="100%" height="4rem" fontSize="1rem">
          ????????????
        </Button>
      </ButtonSection>
    </MovePageButtonSection>
  );

  return (
    <Layout>
      <AccountContainer
        title="?????? ?????? ??????"
        subtitle="ChawChaw?????? ????????? ????????? ??????????????????.` ????????? / ????????????"
      >
        <SignupOrder activeType="2" />
        <Form onSubmit={handleSubmit(onSubmit)}>
          {emailSection}
          {nameSection}
          {passwordSection}
          {confirmPasswordSection}
          <InputSection>
            <Label htmlFor="university" tag="??????">
              ????????????
            </Label>
            <Input id="university" disabled defaultValue={userUniversity} />
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
