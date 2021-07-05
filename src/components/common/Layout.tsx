import React, { Children } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Header } from ".";
import Head from "next/head";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>ChawChaw</title>
        <link
          rel="icon"
          href="https://staybrella.com/img/imgfile1618410549390.png"
        />
      </Head>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

const Container = styled.main`
  max-width: 800px;
  margin: 80px auto 0 auto;
  display: flex;
  margin-top: 140px;
  flex-direction: column;
`;

export { Layout };
