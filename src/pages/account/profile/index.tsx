import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useAlert } from "react-alert";
import { Layout } from "../../../components/common";
import ProfileSection from "../../../components/profile/ProfileSection";
import { LOGIN_PAGE_URL } from "../../../constants";
import { AuthContext } from "../../../store/AuthContext";

export default function Profile() {
  const { isLogin } = useContext(AuthContext);
  const message = useAlert();
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      message.error("로그인 후 이용해주세요.", {
        onClose: () => {
          router.push(LOGIN_PAGE_URL);
        },
      });
      return;
    }
  }, []);

  return (
    <Layout>
      <ProfileSection />
    </Layout>
  );
}
