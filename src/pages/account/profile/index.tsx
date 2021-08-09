import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useAlert } from "react-alert";
import { Layout } from "../../../components/common";
import ProfileSection from "../../../components/ProfileSection/ProfileSection";
import { AuthContext } from "../../../store/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const message = useAlert();
  // useEffect(() => {
  //   if (!user?.token) {
  //     message.error("로그인을 해주세요.", {
  //       onClose: () => {
  //         router.push("/account/login");
  //       },
  //     });
  //   }
  // }, []);
  return (
    <Layout type="loggedIn">
      <ProfileSection />
    </Layout>
  );
}
