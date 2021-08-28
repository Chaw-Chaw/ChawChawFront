import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Layout } from "../../../components/common";
import ProfileSection from "../../../components/ProfileSection";

export default function Profile() {
  const [user, setUser] = useState(
    (() => {
      if (typeof window === "undefined") return {};
      const localStorageUser = window.localStorage.getItem("user");
      if (!localStorageUser) return {};
      return JSON.parse(localStorageUser);
    })()
  );
  const message = useAlert();
  const router = useRouter();
  useEffect(() => {
    const isLogin = user.token;
    if (!isLogin) {
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
