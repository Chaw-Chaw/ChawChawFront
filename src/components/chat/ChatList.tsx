import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ProfileImage } from "./ProfileImage";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { AuthContext } from "../../store/AuthContext";
import { Router, useRouter } from "next/router";
import { ChatBox } from "./";

interface ChatRoomListProps {
  totalMessage: any;
  mainRoomId: number;
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

const ChatRoomList: React.FC<ChatRoomListProps> = (props) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (props.mainRoomId < 0 || props.mainRoomId === undefined) return;
    if (!user.id) return;
    console.log(props.totalMessage, "props.mainRoomId");
  }, [props.mainRoomId]);

  return (
    <Outline>
      <Inner>
        {props.totalMessage.map((item: any) => {
          console.log(item, "item");
          const limitMessageWord = 20;
          const lastMessageInfo = item.messages[item.messages.length - 1];
          const lastMessage = lastMessageInfo.message;
          const limitMessage =
            lastMessage.length > limitMessageWord
              ? lastMessage.substring(0, limitMessageWord) + "..."
              : lastMessage;
          return (
            <ChatBox
              key={item.roomId}
              imageUrl={item.imageUrl}
              regDate={lastMessageInfo.regDate}
              sender={item.sender}
              roomId={item.roomId}
              mainRoomId={props.mainRoomId}
              onClick={() => {
                router.push({
                  pathname: "/chat",
                  query: { userId: item.senderId },
                });
              }}
            >
              {limitMessage}
            </ChatBox>
          );
        })}
      </Inner>
    </Outline>
  );
};

export { ChatRoomList };
