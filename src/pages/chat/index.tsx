import { Layout } from "../../components/common";
import { Message, MessageInput } from "../../components/chat";
import styled from "styled-components";
import DefaultImage from "../../../public/Layout/btsSugar.jpeg";

const Container = styled.div`
  display: flex;
  width: 738px;
  @media (max-width: 768px) {
    width: 500px;
  }
  @media (max-width: 500px) {
    width: 320px;
  }
  flex-direction: column;
  position: relative;
`;

export default function Chat() {
  return (
    <Layout type="loggedIn">
      <Container>
        <Message src={DefaultImage} userName="doodream">
          hello!
        </Message>
        <Message>
          hello every one!
          <br /> nice!
        </Message>
        <MessageInput />
      </Container>
    </Layout>
  );
}
