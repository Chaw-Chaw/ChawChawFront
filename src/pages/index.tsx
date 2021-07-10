import Head from "next/head";
import Image from "next/image";
import { Layout, LoadingSpinner } from "../components/common";
import { Input, PasswordInput } from "../components/common";
import { Banner } from "./home/Banner";
import { ScrollBanner } from "./home/ScrollBanner";

export default function Home() {
  return (
    <Layout>
      <Banner />
      <ScrollBanner />
    </Layout>
  );
}
