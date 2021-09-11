import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import Head from "next/head";
import { AuthContext } from "../../store/AuthContext";
import { ChatContext } from "../../store/ChatContext";

const Layout: React.FC<{ type?: string }> = (props) => {
  // useEffect(() => {
  //   connect(client.current);
  //   return () => disconnect(client.current);
  // }, []);
  return (
    <>
      <Header type={props.type} />
      <Inner>{props.children}</Inner>
    </>
  );
};

const Inner = styled.main`
  margin: 0px auto 0px auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    margin: 70px auto 0px auto;
  }
`;

export { Layout };
