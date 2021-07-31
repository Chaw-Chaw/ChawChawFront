import React, { useContext, useState } from "react";
import {
  Layout,
  Input,
  Label,
  Button,
  universityList,
} from "../../../../components/common/";
import AccountContainer from "../../../../components/account/AccountContainer";
import LoginOrder from "../../../../components/account/LoginOrder";
import styled from "styled-components";
import Link from "next/link";
import { AuthContext } from "../../../../store/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAlert } from "react-alert";
type Inputs = {
  webmail: string;
  verificationNum: number;
};
const InputSection = styled.div`
  width: 100%;
  margin: 20px 0;
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
const Form = styled.form`
  width: 100%;
`;

const RequiredText = styled.span`
  color: ${(props) => props.theme.primaryColor};
  font-size: 0.8rem;
`;

export default function WebMailAuth() {
  const message = useAlert();
  const { sendWebmail, verifyNumber } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [activeVerificationNumber, setActiveVerificationNumber] =
    useState<boolean>(true);

  const webmailSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.webmail) {
      setActiveVerificationNumber(false);
      console.log(data.webmail);
      sendWebmail(data);
      return;
    }
    message.error("웹메일을 입력해주세요.");
  };

  const verificationNumSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.verificationNum) {
      console.log(data.verificationNum);
      verifyNumber(data);
      return;
    }
    message.error("인증번호를 입력해주세요.");
  };

  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === "Enter") e.preventDefault();
  };
  return (
    <Layout type="signup">
      <AccountContainer
        title="ChawChaw에`오신 것을 환영 해요."
        subtitle="현재 재학중인 대학교의 웹메일을 입력해주세요.`웹 메일로 인증번호가 발송됩니다."
      >
        <LoginOrder activeType="1" />
        <Form
          onSubmit={handleSubmit(webmailSubmit)}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <InputSection>
            <Label htmlFor="webmail" tag="필수">
              웹 메일
            </Label>
            <Input
              placeholder="example@address.ac.kr"
              {...register("webmail", {
                pattern:
                  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@([-_\.]?[0-9a-zA-Z])*.ac*.kr$/i,
              })}
            />
            {errors.webmail && (
              <RequiredText>웹메일 형식을 맞춰주세요.</RequiredText>
            )}
          </InputSection>
          <ButtonSection>
            <Button type="submit" width="100%" height="2rem" fontSize="1rem">
              발송하기
            </Button>
          </ButtonSection>
        </Form>
        <Form
          onSubmit={handleSubmit(verificationNumSubmit)}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <InputSection>
            <Label htmlFor="verificationNum" tag="필수">
              인증번호
            </Label>
            <Input
              disabled={activeVerificationNumber}
              {...register("verificationNum", {
                pattern: /[0-9]/g,
              })}
            />
            {errors.verificationNum && (
              <RequiredText>숫자만 입력해 주세요.</RequiredText>
            )}
          </InputSection>
          <MovePageButtonSection>
            <ButtonSection marginRight="20px">
              <Link href="/">
                <a>
                  <Button secondary width="100%" height="4rem" fontSize="1rem">
                    페이지 소개
                  </Button>
                </a>
              </Link>
            </ButtonSection>
            <ButtonSection marginLeft="20px">
              <Button type="submit" width="100%" height="4rem" fontSize="1rem">
                회원 정보 입력
              </Button>
            </ButtonSection>
          </MovePageButtonSection>
        </Form>
      </AccountContainer>
    </Layout>
  );
}
