import { Layout } from "../../components/common";
import { Message, MessageInput, ChatRoom } from "../../components/chat";
import styled from "styled-components";
import DefaultImage from "../../../public/Layout/btsSugar.jpeg";

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 500px;
  @media (max-width: 500px) {
    max-width: 320px;
  }
  justify-content: center;
`;

export default function Chat() {
  return (
    <Layout>
      <Container>
        <ChatRoom />
      </Container>
    </Layout>
  );
}
