import { Layout } from "../../../components/common";
import ProfileSection from "../../../components/ProfileSection/ProfileSection";

export default function Profile() {
  return (
    <Layout type="loggedIn">
      <ProfileSection />
    </Layout>
  );
}
