import { useRouter } from "next/router";
import React, { MouseEventHandler, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  LIKEALARM_TYPE,
  CHATALARM_TYPE,
  CHATROOM_TYPE,
  DEFAULT_PROFILE_IMAGE,
  LIMIT_NEWALARM_SIZE,
} from "../../constants";
import { CHAT_PAGE_URL } from "../../constants/pageUrls";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ChatContext } from "../../store/ChatContext";
import { chatActions } from "../../store/chatSlice";
import { MessageImage } from "../chat/Message/MessageImage";
import { AlarmCount } from "./AlarmCount";

interface ChatBoxProps {
  imageUrl: string;
  regDate: string;
  sender: string;
  roomId?: number;
  context: string;
  senderId?: number;
  type: string;
}

const MChatBox: React.FC<ChatBoxProps> = (props) => {
  const { mainRoom, newMessages } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const mainChatList = useRef<HTMLLIElement>(null);
  const router = useRouter();
  const regDate = props.regDate.split("T").join(" ");
  const isCurrentChat = props.roomId === mainRoom.id;
  const matchNewMessages = newMessages.filter((item) => {
    if (item.roomId === props.roomId) return true;
    return false;
  });

  const handleClick: MouseEventHandler<HTMLLIElement> = (e) => {
    e.preventDefault();
    if (props.type === CHATROOM_TYPE) {
      if (isCurrentChat) return;
      router.push({
        pathname: CHAT_PAGE_URL,
        query: { userId: props.senderId },
      });
      return;
    }
    if (props.type === CHATALARM_TYPE) {
      if (props.roomId && props.senderId) {
        dispatch(
          chatActions.updateMainRoom({
            id: props.roomId,
            userId: props.senderId,
          })
        );
        router.push({
          pathname: CHAT_PAGE_URL,
          query: { userId: props.senderId },
        });
      }
      return;
    }
    if (props.type === LIKEALARM_TYPE) {
      return;
    }
    return;
  };

  const alarmCount = props.type === CHATROOM_TYPE &&
    matchNewMessages.length !== 0 && (
      <AlarmCount>
        <span>
          {matchNewMessages.length > LIMIT_NEWALARM_SIZE
            ? LIMIT_NEWALARM_SIZE
            : matchNewMessages.length}
        </span>
      </AlarmCount>
    );

  const sliceContext =
    props.context.length > 20
      ? props.context.substring(0, 15) + "..."
      : props.context;

  useEffect(() => {
    if (!mainChatList.current) return;
    mainChatList.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, [mainRoom.id]);

  return (
    <ChatContainer
      ref={isCurrentChat ? mainChatList : null}
      isCurrentChat={isCurrentChat}
      onClick={handleClick}
    >
      <MessageImage
        src={props.imageUrl ? `${props.imageUrl}` : DEFAULT_PROFILE_IMAGE}
      >
        {alarmCount}
      </MessageImage>
      <ChatMessageBox isCurrentChat={isCurrentChat}>
        <ChatUserName isCurrentChat={isCurrentChat}>
          {props.sender}
        </ChatUserName>
        {sliceContext}
        <RegDateMessage>{regDate}</RegDateMessage>
      </ChatMessageBox>
    </ChatContainer>
  );
};

const ChatBox = React.memo(MChatBox);
export { ChatBox };

const ChatContainer = styled.li<{ isCurrentChat: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  background-color: ${(props) =>
    props.isCurrentChat
      ? props.theme.primaryColor
      : props.theme.bodyBackgroundColor};
  border: 1px solid ${(props) => props.theme.primaryColor};
  border-radius: 20px;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 10px;
`;

const ChatUserName = styled.h2<{ isCurrentChat: boolean }>`
  font-family: "BMJUA";
  font-size: 1.3rem;
  margin: 0px;
  margin-bottom: 5px;
  color: ${(props) => (props.isCurrentChat ? "white" : props.theme.colors)};
  /* color: rgb(126, 126, 126); */
`;

const ChatMessageBox = styled.div<{ isCurrentChat: boolean }>`
  color: ${(props) => (props.isCurrentChat ? "white" : props.theme.colors)};
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
