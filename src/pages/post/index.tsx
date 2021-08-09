import { Layout } from "../../components/common";
import styled from "styled-components";
import PostSearch from "./PostSearch";
import PostOrder from "./PostOrder";
import PostSection from "./PostSection";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import axios from "axios";

const Container = styled.div<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "500px")};
  max-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 200px;
`;
export default function Post() {
  return (
    <Layout>
      <Container width="90%">
        <PostSearch />
        <PostOrder />
        <PostSection />
      </Container>
    </Layout>
  );
}
