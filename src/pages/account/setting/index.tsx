import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { Layout } from "../../../components/common";
import { SettingBlockList } from "../../../components/setting/SettingBlockList";
import { SettingUserDelete } from "../../../components/setting/SettingUserDelete";
import { SettingUserUniversity } from "../../../components/setting/SettingUserUniversity";
import { LOGIN_PAGE_URL } from "../../../constants";
import { AuthContext } from "../../../store/AuthContext";

export default function Setting() {
  const { isLogin, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user.role === "ADMIN") {
      return;
    }
    if (!isLogin) {
      // message.error("로그인 후 이용해주세요.", {
      //   onClose: () => {
      //     router.push(LOGIN_PAGE_URL);
      //   },
      // });
      return;
    }
  }, []);

  return (
    <Layout>
      <Container>
        <SettingInfoBox>
          <SettingBlockList />
          <SettingUserUniversity />
          <SettingUserDelete />
        </SettingInfoBox>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px 0px;
`;

const SettingInfoBox = styled.div`
  width: 650px;
  @media (max-width: 768px) {
    width: 500px;
  }
  @media (max-width: 500px) {
    width: 320px;
  }
`;
