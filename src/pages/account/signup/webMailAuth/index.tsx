import React, { useRef, useState } from "react";
import {
  Layout,
  Header,
  Input,
  Label,
  Button,
  ModalLayout,
} from "../../../../components/common/";
import AccountContainer from "../../../../components/account/AccountContainer";
import { SignupTypeModal } from "../../../../components/account/LoginTypeModal";
import LoginOrder from "../../../../components/account/LoginOrder";
import styled from "styled-components";
import Link from "next/link";

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

export default function WebMailAuth() {
  return (
    <Layout type="signup">
      <AccountContainer
        title="ChawChaw에`오신 것을 환영 해요."
        subtitle="현재 재학중인 대학교의 웹메일을 입력해주세요.`웹 메일로 인증번호가 발송됩니다."
      >
        <LoginOrder activeType="1" />
        <InputSection>
          <Label htmlFor="webmail" tag="필수">
            웹 메일
          </Label>
          <Input type="email" name="webmail" />
        </InputSection>
        <ButtonSection>
          <Button width="100%" height="2rem" fontSize="1rem">
            발송하기
          </Button>
        </ButtonSection>
        <InputSection>
          <Label htmlFor="authNumber" tag="필수">
            인증번호
          </Label>
          <Input name="authNumber" />
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
            <Link href="/account/signup">
              <a>
                <Button width="100%" height="4rem" fontSize="1rem">
                  회원 정보 입력
                </Button>
              </a>
            </Link>
          </ButtonSection>
        </MovePageButtonSection>
      </AccountContainer>
    </Layout>
  );
}
