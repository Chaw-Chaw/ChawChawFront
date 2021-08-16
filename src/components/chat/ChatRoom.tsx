import { Message, MessageInput } from ".";
import styled from "styled-components";
import DefaultImage from "../../../public/Layout/btsSugar.jpeg";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { useController } from "react-hook-form";
import { AuthContext } from "../../store/AuthContext";

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
  box-sizing: border-box;
  /* padding: 20px; */
  height: 100%;
`;

const Header = styled.div`
  position: sticky;
  top: 0px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.secondaryColor};
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  height: 50px;
  z-index: 50;
`;
const MessageContainer = styled.div`
  height: calc(100% - 50px);
  width: 100%;
  overflow: auto;
`;

const ChatRoom: React.FC = () => {
  const { user } = useContext(AuthContext);
  const ROOM_SEQ = 1;
  const client = useRef<any>({});
  const [chatMessages, setChatMessages] = useState<any>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const connect = () => {
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
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = () => {
    client.current.subscribe(`/queue/chat/room/4`, (response: any) => {
      const message = JSON.parse(response.body);
      console.log(response, "subscribe");
      setChatMessages((chatMessage: any) => [...chatMessage, message]);
    });
  };

  const publish = (message: any) => {
    if (!client.current.connected) {
      return;
    }

    client.current.publish({
      destination: "/message",
      body: JSON.stringify({ roomId: 4, sender: user.name, message }),
    });
    setMessage("");
  };

  return (
    <Outline>
      <Inner>
        {/* <Header>
        </Header> */}
        <MessageContainer>
          {/* <Message src={DefaultImage} userName="doodream">
            hello!
          </Message> */}
          {chatMessages && chatMessages.length > 0 && (
            <div>
              {chatMessages.map((chatMessage: any, index: any) => {
                if (user.name === chatMessage.sender) {
                  return <Message key={index}>{chatMessage.message}</Message>;
                } else {
                  return (
                    <Message
                      src={`https://mylifeforcoding.com/users/image?imageUrl=${chatMessage.imageUrl}`}
                      key={index}
                    >
                      {chatMessage.message}
                    </Message>
                  );
                }
              })}
            </div>
          )}
        </MessageContainer>
        <MessageInput
          onChange={(e) => {
            // if (e.key === "Enter") return;
            e.preventDefault();
            setMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setMessage("");
              publish(message);
            }
          }}
          value={message}
        />
      </Inner>
    </Outline>
  );
};

export { ChatRoom };
