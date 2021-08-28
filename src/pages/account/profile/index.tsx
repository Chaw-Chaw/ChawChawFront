import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useCookies } from "react-cookie";
import { Layout } from "../../../components/common";
import ProfileSection from "../../../components/ProfileSection";
import { AuthContext } from "../../../store/AuthContext";

export default function Profile() {
  const [cookies] = useCookies(["accessToken"]);
  const message = useAlert();
  const router = useRouter();
  const accessToken = cookies.accessToken;
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
