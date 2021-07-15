import React from "react";
import {
  Layout,
  Header,
  Input,
  Label,
  Button,
} from "../../../../components/common/";
import AccountContainer from "../../components/AccountContainer";
import LoginOrder from "../../components/LoginOrder";
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

export default function Profile() {
  return (
    <Layout>
      <Header type="profile" />
      <AccountContainer
        title="프로필 생성"
        subtitle="프로필을 완성해서` 자신의 매력을 포스팅 해보세요."
      >
        <LoginOrder activeType="3" />

        <MovePageButtonSection>
          <ButtonSection marginRight="20px">
            <Link href="/account/signup">
              <a>
                <Button secondary width="100%" height="4rem" fontSize="1rem">
                  회원 가입
                </Button>
              </a>
            </Link>
          </ButtonSection>
          <ButtonSection marginLeft="20px">
            <Link href="/account/login">
              <a>
                <Button width="100%" height="4rem" fontSize="1rem">
                  로그인
                </Button>
              </a>
            </Link>
          </ButtonSection>
        </MovePageButtonSection>
      </AccountContainer>
    </Layout>
  );
}
