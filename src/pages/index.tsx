import { Layout } from "../components/common";
import Banner from "./home/Banner";
import ScrollBanner from "./home/ScrollBanner";

export default function Home() {
  return (
    <Layout>
      <Banner />
      <ScrollBanner />
    </Layout>
  );
}
