import React, { MouseEventHandler, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { DEFAULT_PROFILE_IMAGE } from "../../constants";
import { ChatContext } from "../../store/ChatContext";
import { MessageImage } from "../chat/Message/MessageImage";
import { AlarmCount } from "./AlarmCount";

interface ChatBoxProps {
  imageUrl: string;
  regDate: string;
  sender: string;
  roomId: number;
  onClick: () => void;
  context: string;
  chatList?: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = (props) => {
  const { mainRoomId, newMessages } = useContext(ChatContext);
  const mainChatList = useRef<HTMLDivElement>(null);
  const regDate = props.regDate.split("T").join(" ");
  const type = props.roomId === mainRoomId ? "current" : "";
  const matchNewMessages = newMessages.filter((item: any) => {
    if (item.roomId === props.roomId) return true;
    return false;
  });

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
        e.preventDefault();
        if (type) return;
        props.onClick();
      }}
    >
      <MessageImage
        src={props.imageUrl ? `${props.imageUrl}` : DEFAULT_PROFILE_IMAGE}
      >
        {!props.chatList && matchNewMessages.length !== 0 && (
          <AlarmCount>
            <span>
              {matchNewMessages.length > 99 ? 99 : matchNewMessages.length}
            </span>
          </AlarmCount>
        )}
      </MessageImage>
      <ChatMessageBox type={type}>
        <ChatUserName type={type}>{props.sender}</ChatUserName>
        {props.context.length > 20
          ? props.context.substring(18) + "..."
          : props.context}
        <RegDateMessage>{regDate}</RegDateMessage>
      </ChatMessageBox>
    </ChatContainer>
  );
};

export { ChatBox };
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
  margin-bottom: 5px;
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
