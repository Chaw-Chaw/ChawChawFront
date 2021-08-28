import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import Head from "next/head";
import { AuthContext } from "../../store/AuthContext";

const Layout: React.FC<{ type?: string }> = (props) => {
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
      <Header type={props.type} />
      <Inner>{props.children}</Inner>
    </>
  );
};

const Inner = styled.main`
  margin: 0px auto 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    margin: 0px auto 0 auto;
  }
`;

export { Layout };
