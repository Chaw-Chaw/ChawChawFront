import React from "react";
import {
  Layout,
  Header,
  Input,
  Label,
  Button,
  PasswordInput,
} from "../../../components/common/";
import AccountContainer from "../../../components/account/AccountContainer";
import LoginOrder from "../../../components/account/LoginOrder";
import styled from "styled-components";
import Link from "next/link";

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

export default function SignUp() {
  return (
    <Layout type="signup">
      <AccountContainer
        title="회원 정보 입력"
        subtitle="ChawChaw에서 사용할 정보를 입력해주세요.` 이메일 / 비밀번호"
      >
        <LoginOrder activeType="2" />
        <InputSection>
          <Label htmlFor="email">이메일</Label>
          <EmailInputBox>
            <Input type="email" name="email" />
            <EmailDuplicationCheckButton>중복검사</EmailDuplicationCheckButton>
          </EmailInputBox>
        </InputSection>
        <InputSection>
          <Label htmlFor="username">이름</Label>
          <Input name="username" />
        </InputSection>
        <InputSection>
          <Label htmlFor="password">비밀번호</Label>
          <PasswordInput name="password" />
        </InputSection>
        <InputSection>
          <Label htmlFor="passwordCheck" tag="확인">
            비밀번호
          </Label>
          <PasswordInput name="passwordCheck" />
        </InputSection>
        <InputSection>
          <Label htmlFor="university" tag="필수">
            소속학교
          </Label>
          <Input name="university" disabled />
        </InputSection>
        <MovePageButtonSection>
          <ButtonSection marginRight="20px">
            <Link href="/account/signup/webMailAuth">
              <a>
                <Button secondary width="100%" height="4rem" fontSize="1rem">
                  웹메일 인증
                </Button>
              </a>
            </Link>
          </ButtonSection>
          <ButtonSection marginLeft="20px">
            <Link href="/account/signup/profile">
              <a>
                <Button width="100%" height="4rem" fontSize="1rem">
                  프로필 생성
                </Button>
              </a>
            </Link>
          </ButtonSection>
        </MovePageButtonSection>
      </AccountContainer>
    </Layout>
  );
}
