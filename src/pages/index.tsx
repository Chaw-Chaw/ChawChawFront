import Head from "next/head";
import Image from "next/image";
import { Layout, LoadingSpinner } from "../components/common";
import { Input, PasswordInput } from "../components/common";

export default function Home() {
  return (
    <Layout>
      <Input />
      <PasswordInput />
      <LoadingSpinner />
    </Layout>
  );
}
