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
          type="image/png"
          sizes="32x32"
          href="/Layout/chaw.png"
        />
      </Head>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

const Container = styled.main`
  max-width: 800px;
  margin: 140px auto 0 auto;
  display: flex;
  margin-top: 140px;
  flex-direction: column;
`;

export { Layout };
