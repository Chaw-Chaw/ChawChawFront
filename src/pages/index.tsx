import Head from "next/head";
import styled from "styled-components";
import { Layout } from "../components/common";
import Banner from "./home/Banner";
import ScrollBanner from "./home/ScrollBanner";

export default function Home() {
  return (
    <Layout>
      <Main>
        <Banner />
        <ScrollBanner />
      </Main>
    </Layout>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1050px;
  @media (max-width: 1000px) {
    width: 750px;
  }
  @media (max-width: 768px) {
    width: 500px;
  }
  @media (max-width: 500px) {
    width: 320px;
  }
`;
