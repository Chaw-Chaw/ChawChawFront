import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Layout } from "../../../components/common";
import ProfileSection from "../../../components/profile/ProfileSection";
import { AuthContext } from "../../../store/AuthContext";

export default function Profile() {
  const { accessToken } = useContext(AuthContext);
  const message = useAlert();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      message.error("로그인 후 이용해주세요.", {
        onClose: () => {
          router.push("/account/login");
        },
      });
    }
  }, []);

  return (
    <Layout>
      <ProfileSection />
    </Layout>
  );
}

// const SettingContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: ;
// `;
