import {
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Layout, Input, Label, Button } from "../../../../components/common/";
import AccountContainer from "../../../../components/account/AccountContainer";
import SignupOrder from "../../../../components/account/SignupOrder";
import styled from "styled-components";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CONFIRM_DISPATCH_SIGNUP,
  CONFIRM_PUSH_POSTPAGE,
  CONFIRM_PUSH_SIGNUP,
  ERROR_AFTERLOGOUT_SIGNUP_MSG,
  ERROR_ALERT,
  ERROR_NOTFOUND_WEBMAIL_MSG,
  FACEBOOK_PROVIDER,
  KAKAO_PROVIDER,
  KEYTYPE_ENTER,
  LOGIN_PAGE_TITLE,
  MAIN_PAGE,
  SUCCESS_ALERT,
  SUCCESS_VERIFYNUM_MSG,
  WARNING_ALERT,
  WARNING_CHECK_WEBMAIL_MSG,
  WARNING_ENTER_VERIFYNUM_MSG,
} from "../../../../constants";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { alertActions } from "../../../../store/alertSlice";
import { isLogin } from "../../../../utils/index";
import { Inputs } from "../../../../types/account";
import {
  sendWebmail,
  verificationNumber,
  webmailVerify,
} from "../../../../store/actions/authActions";
import { asyncErrorHandle } from "../../../../store/actions/alertActions";

export default function WebMailAuth() {
  const webmailRef = useRef<HTMLInputElement>(null);
  const [webmailValidate, setWebmailValidate] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const isSocialSignup =
    user.provider === KAKAO_PROVIDER || user.provider === FACEBOOK_PROVIDER;
  const [activeVerificationNumber, setActiveVerificationNumber] =
    useState<boolean>(true);

  const publishSubmit = () => {
    try {
      if (!webmailRef.current) {
        return;
      }
      const webmail = webmailRef.current.value;
      if (webmail === "") {
        dispatch(
          alertActions.updateAlert({
            name: WARNING_ALERT,
            message: WARNING_CHECK_WEBMAIL_MSG,
          })
        );
        return;
      }

      const validationWebmail = webmailVerify(webmail);
      if (validationWebmail) {
        setWebmailValidate(false);
        setActiveVerificationNumber(false);
        dispatch(sendWebmail(webmail));
      } else {
        setWebmailValidate(true);
        dispatch(
          alertActions.updateAlert({
            name: ERROR_ALERT,
            message: ERROR_NOTFOUND_WEBMAIL_MSG,
          })
        );
        return;
      }
    } catch (err) {
      dispatch(asyncErrorHandle(err));
      return;
    }
  };
  const verificationNumSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!webmailRef.current) return;
    if (!(data.verificationNumber && !activeVerificationNumber)) {
      dispatch(
        alertActions.updateAlert({
          name: WARNING_ALERT,
          message: WARNING_ENTER_VERIFYNUM_MSG,
        })
      );
      return;
    }

    try {
      await dispatch(
        verificationNumber({
          email: webmailRef.current.value,
          verificationNumber: data.verificationNumber,
        })
      );
    } catch (error) {}
    dispatch(
      alertActions.updateAlert({
        name: SUCCESS_ALERT,
        message: SUCCESS_VERIFYNUM_MSG,
        confirmFuncName: isSocialSignup
          ? CONFIRM_DISPATCH_SIGNUP
          : CONFIRM_PUSH_SIGNUP,
      })
    );
  };

  const handleClickPublishBtn: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    publishSubmit();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (e) => {
    if (e.code === KEYTYPE_ENTER) e.preventDefault();
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
  }, [dispatch]);

  const webmailSection = (
    <InputSection>
      <Label htmlFor="webmail" tag="필수">
        웹 메일
      </Label>
      <Input name="webmail" placeholder="대학교 웹메일주소" ref={webmailRef} />
      {webmailValidate && (
        <RequiredText>웹메일 형식을 맞춰주세요.</RequiredText>
      )}
    </InputSection>
  );

  const publishWebmailButton = (
    <ButtonSection>
      <PublishButton
        onClick={handleClickPublishBtn}
        width="100%"
        height="2rem"
        fontSize="1rem"
      >
        발송하기
      </PublishButton>
    </ButtonSection>
  );

  const enterVerifyNumberSection = (
    <InputSection>
      <Label htmlFor="verificationNumber" tag="필수">
        인증번호
      </Label>
      <Input
        disabled={activeVerificationNumber}
        {...register("verificationNumber", {
          pattern: /[0-9]/g,
        })}
      />
      {errors.verificationNumber && (
        <RequiredText>숫자만 입력해 주세요.</RequiredText>
      )}
    </InputSection>
  );

  return (
    <Layout>
      <AccountContainer
        title={LOGIN_PAGE_TITLE}
        subtitle="현재 재학중인 대학교의 웹메일을 입력해주세요.`웹 메일로 인증번호가 발송됩니다."
      >
        <SignupOrder activeType="1" />
        {webmailSection}
        {publishWebmailButton}
        <Form
          onSubmit={handleSubmit(verificationNumSubmit)}
          onKeyDown={handleKeyDown}
        >
          {enterVerifyNumberSection}
          <MovePageButtonSection>
            <ButtonSection marginRight="20px">
              <Link href={MAIN_PAGE}>
                <a>
                  <Button secondary width="100%" height="4rem" fontSize="1rem">
                    페이지 소개
                  </Button>
                </a>
              </Link>
            </ButtonSection>
            <ButtonSection marginLeft="20px">
              <Button type="submit" width="100%" height="4rem" fontSize="1rem">
                {isSocialSignup ? "회원가입" : "회원 정보 입력"}
              </Button>
            </ButtonSection>
          </MovePageButtonSection>
        </Form>
      </AccountContainer>
    </Layout>
  );
}

const InputSection = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const PublishButton = styled(Button)``;
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
const Form = styled.form`
  width: 100%;
`;

const RequiredText = styled.span`
  color: ${(props) => props.theme.primaryColor};
  font-size: 0.8rem;
`;
