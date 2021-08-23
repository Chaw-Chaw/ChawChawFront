import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ProfileImage } from "./ProfileImage";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { AuthContext } from "../../store/AuthContext";
import { Router, useRouter } from "next/router";

interface ChatBoxProps {
  imageUrl: any;
  regDate: any;
  sender: any;
  roomId: number;
  mainRoomId: number;
  onClick: () => void;
}

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
`;

const RegDateMessage = styled.div`
  font-size: 0.5rem;
  color: ${(props) => props.theme.secondaryColor};
  margin-top: 4px;
  margin-left: auto;
`;

const ChatBox: React.FC<ChatBoxProps> = (props) => {
  const mainChatList = useRef<HTMLDivElement>(null);
  const regDate = props.regDate.split("T").join(" ");

  const type = props.roomId === props.mainRoomId ? "current" : "";
  useEffect(() => {
    if (!mainChatList.current) return;
    mainChatList.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, [props.mainRoomId]);
  return (
    <ChatContainer
      ref={type ? mainChatList : null}
      type={type}
      onClick={type ? () => {} : props.onClick}
    >
      <ProfileImage
        src={
          props.imageUrl
            ? `https://mylifeforcoding.com/users/image?imageUrl=${props.imageUrl}`
            : `https://mylifeforcoding.com/users/image?imageUrl=default.png`
        }
      />
      <ChatMessageBox type={type}>
        <ChatUserName type={type}>{props.sender}</ChatUserName>
        {props.children}
        <RegDateMessage>{regDate}</RegDateMessage>
      </ChatMessageBox>
    </ChatContainer>
  );
};

export { ChatBox };
