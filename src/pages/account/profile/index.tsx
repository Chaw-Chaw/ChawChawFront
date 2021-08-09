import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useAlert } from "react-alert";
import { Layout } from "../../../components/common";
import ProfileSection from "../../../components/ProfileSection/ProfileSection";
import { AuthContext } from "../../../store/AuthContext";

export default function Profile() {
  return (
    <Layout>
      <ProfileSection />
    </Layout>
  );
}
