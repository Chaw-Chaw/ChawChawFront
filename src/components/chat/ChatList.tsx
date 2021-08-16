import React from "react";
import styled from "styled-components";
import { ProfileImage } from "./ProfileImage";

interface ChatBoxProps {
  regDate?: string;
  name?: string;
  imageUrl?: string;
}
const Outline = styled.div`
  border: none;
  box-sizing: border-box;
  overflow: auto;
  height: calc(100vh - 150px);
  /* margin-bottom: 50px; */
  width: 100%;
  max-width: 460px;
  @media (max-width: 500px) {
    min-width: 320px;
  }
  padding: 20px 20px 20px 20px;
`;

const Inner = styled.div`
  overflow: auto;
  border-left: 1px solid ${(props) => props.theme.secondaryColor};
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
`;

const ChatContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  border: 1px solid ${(props) => props.theme.primaryColor};
  border-radius: 20px;
  padding: 10px;
  box-sizing: border-box;
`;

const ChatUserName = styled.h2`
  font-size: 1rem;
  margin: 0px;
  margin-bottom: 2px;
  color: rgb(126, 126, 126);
`;

const ChatMessageBox = styled.div``;

const ChatBox: React.FC<ChatBoxProps> = (props) => {
  return (
    <ChatContainer>
      <ProfileImage
        src={
          props.imageUrl
            ? props.imageUrl
            : `https://mylifeforcoding.com/users/image?imageUrl=default.png`
        }
      />

      {props.children}
    </ChatContainer>
  );
};

const ChatRoomList: React.FC = () => {
  return (
    <Outline>
      <Inner>
        <ChatBox>마지막 채팅 메세지</ChatBox>
      </Inner>
    </Outline>
  );
};

export { ChatRoomList };
