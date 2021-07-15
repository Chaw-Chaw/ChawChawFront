import React from "react";
import {
  Layout,
  Header,
  Input,
  PasswordInput,
  Label,
  Button,
} from "../../../components/common/";
import { AccountContainer } from "../components/AccountContainer";
import styled from "styled-components";

const InputSection = styled.div`
  width: 100%;
  margin: 10px 0;
`;
const ButtonSection = styled.div`
  width: 100%;
`;

export default function Login() {
  return (
    <Layout>
      <Header type="login" />
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
          <Button width="100%" height="4rem" fontSize="2rem">
            Login
          </Button>
        </ButtonSection>
      </AccountContainer>
    </Layout>
  );
}
