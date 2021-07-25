import { Message, MessageInput } from ".";
import styled from "styled-components";
import DefaultImage from "../../../public/Layout/btsSugar.jpeg";

const Outline = styled.div`
  border: none;
  box-sizing: border-box;
  overflow: auto;
  height: calc(100vh - 200px);
  /* margin-bottom: 50px; */
  width: 100%;
  max-width: 460px;
  @media (max-width: 500px) {
    min-width: 320px;
  }
  padding: 20px 20px 20px 20px;
`;

const Inner = styled.div`
  position: relative;
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  height: 50px;
`;

const ChatRoom: React.FC = () => {
  return (
    <Outline>
      <Header></Header>
      <Inner>
        <Message src={DefaultImage} userName="doodream">
          hello!
        </Message>
        <Message>
          hello every one!
          <br /> nice!
        </Message>
        <Message src={DefaultImage} userName="doodream">
          hello!
        </Message>
        <Message>
          hello every one!
          <br /> nice!
        </Message>
        <Message src={DefaultImage} userName="doodream">
          hello!
        </Message>
        <Message>
          hello every one!
          <br /> nice!
        </Message>
        <Message src={DefaultImage} userName="doodream">
          hello!
        </Message>
        <Message>
          hello every one!
          <br /> nice!
        </Message>
        <Message src={DefaultImage} userName="doodream">
          hello!
        </Message>
        <Message>
          hello every one!
          <br /> nice!
        </Message>
      </Inner>
      <MessageInput />
    </Outline>
  );
};

export { ChatRoom };
