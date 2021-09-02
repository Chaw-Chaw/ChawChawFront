import React, { MouseEventHandler, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { DEFAULT_PROFILE_IMAGE } from "../../../constants";
import { ChatContext } from "../../../store/ChatContext";
import { MessageImage } from "../Message/MessageImage";

interface ChatBoxProps {
  imageUrl: any;
  regDate: any;
  sender: any;
  roomId: number;
  onClick: MouseEventHandler<HTMLDivElement>;
  context: string;
}

const ChatBox: React.FC<ChatBoxProps> = (props) => {
  const { mainRoomId } = useContext(ChatContext);
  const mainChatList = useRef<HTMLDivElement>(null);
  const regDate = props.regDate.split("T").join(" ");
  const type = props.roomId === mainRoomId ? "current" : "";
  useEffect(() => {
    if (!mainChatList.current) return;
    mainChatList.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, [mainRoomId]);
  return (
    <ChatContainer
      ref={type ? mainChatList : null}
      type={type}
      onClick={(e) => {
        if (type) return;
        props.onClick(e);
      }}
    >
      <MessageImage
        src={props.imageUrl ? `${props.imageUrl}` : DEFAULT_PROFILE_IMAGE}
      />
      <ChatMessageBox type={type}>
        <ChatUserName type={type}>{props.sender}</ChatUserName>
        {props.context}
        <RegDateMessage>{regDate}</RegDateMessage>
      </ChatMessageBox>
    </ChatContainer>
  );
};

export default ChatBox;
const ChatContainer = styled.div<{ type: string }>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  background-color: ${(props) =>
    props.type === "current"
      ? props.theme.primaryColor
      : props.theme.bodyBackgroundColor};
  border: 1px solid ${(props) => props.theme.primaryColor};
  border-radius: 20px;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 10px;
`;

const ChatUserName = styled.h2<{ type: string }>`
  font-family: "BMJUA";
  font-size: 1.3rem;
  margin: 0px;
  margin-bottom: 10px;
  color: ${(props) =>
    props.type === "current" ? "white" : props.theme.colors};
  /* color: rgb(126, 126, 126); */
`;

const ChatMessageBox = styled.div<{ type: string }>`
  color: ${(props) =>
    props.type === "current" ? "white" : props.theme.colors};
  width: 80%;
  display: flex;
  flex-direction: column;
  font-family: "Source Sans Pro";
`;

const RegDateMessage = styled.div`
  font-size: 0.5rem;
  color: ${(props) => props.theme.secondaryColor};
  margin-top: 4px;
  margin-left: auto;
  font-family: "BMJUA";
`;
