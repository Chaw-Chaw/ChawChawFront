import React, { Children } from "react";
import Link from "next/link";
import styled from "styled-components";
import Header from "../Header/Header";
import Head from "next/head";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>ChawChaw</title>
        <link
          rel="icon"
          href="https://staybrella.com/img/imgfile1618410549390.png"
        />
      </Head>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
