import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ProfileImage } from "./ProfileImage";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { AuthContext } from "../../store/AuthContext";
import { Router, useRouter } from "next/router";

interface ChatRoomListProps {
  chatListInfo: any[];
  mainRoomId: number;
}

interface ChatBoxProps {
  imageUrl: any;
  regDate: any;
  sender: any;
  roomId: number;
  mainRoomId: number;
  onClick: () => void;
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
  const regDate = props.regDate.split("T").join(" ");
  console.log(props.roomId, props.mainRoomId, " chatbox");
  const type = props.roomId === props.mainRoomId ? "current" : "";
  return (
    <ChatContainer type={type} onClick={props.onClick}>
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

const ChatRoomList: React.FC<ChatRoomListProps> = (props) => {
  const [chatListInfo, setChatListInfo] = useState(props.chatListInfo);
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const client = useRef<any>({});
  useEffect(() => {
    if (props.mainRoomId < 0 || props.mainRoomId === undefined) return;
    if (!user.id) return;
    console.log(props, "props.mainRoomId");
    setChatListInfo((pre) => [...pre, ...props.chatListInfo]);
    connect(user.id.toString());
    return () => disconnect();
  }, [props.mainRoomId]);

  const connect = (userId: string) => {
    client.current = new StompJs.Client({
      // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
      webSocketFactory: () => new SockJS("https://mylifeforcoding.com/ws"), // proxy를 통한 접속
      // connectHeaders: {
      //   "auth-token": "spring-chat-auth-token",
      // },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscribe(userId);
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };
  const subscribe = (userId: string) => {
    if (Number(userId) < 0 || userId === undefined) {
      alert("유저가 없습니다.");
    }
    client.current.subscribe(
      `/queue/chat/room/wait/${userId}`,
      (response: any) => {
        const message = JSON.parse(response.body);
        console.log(response, "subscribeChatList");
        setChatListInfo((chatListInfo: any) => [...chatListInfo, message]);
      }
    );
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  return (
    <Outline>
      <Inner>
        {chatListInfo.map((item) => {
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
              key={item.roodId}
              imageUrl={item.imageUrl}
              regDate={lastMessageInfo.regDate}
              sender={item.sender}
              roomId={item.roodId}
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
