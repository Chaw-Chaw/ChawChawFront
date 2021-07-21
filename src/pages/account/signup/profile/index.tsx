import React from "react";
import { Layout, Button } from "../../../../components/common/";
import AccountContainer from "../../../../components/account/AccountContainer";
import LoginOrder from "../../../../components/account/LoginOrder";
import styled from "styled-components";
import Link from "next/link";
import ProfileSection from "../../../../components/ProfileSection/ProfileSection";

const ButtonSection = styled.div<{ marginRight?: string; marginLeft?: string }>`
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "0px")};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : "0px")};
  width: 100%;
`;

const MovePageButtonSection = styled.div`
  margin-top: 20px;
  width: 450px;
  display: flex;
`;

export default function Profile() {
  return (
    <Layout type="profile">
      <AccountContainer
        title="프로필 생성"
        subtitle="프로필을 완성해서` 자신의 매력을 포스팅 해보세요."
        width="640px"
      >
        <LoginOrder activeType="3" />
        <ProfileSection />
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
