import { Message, MessageInput } from ".";
import styled from "styled-components";
import DefaultImage from "../../../public/Layout/btsSugar.jpeg";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ChangeEvent, useEffect, useRef, useState } from "react";

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

const ChatRoom: React.FC = () => {
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
    client.current.subscribe(`/sub/chat/${ROOM_SEQ}`, ({ body }: any) => {
      setChatMessages((chatMessage: any) => [...chatMessage, JSON.parse(body)]);
    });
  };

  const publish = (message: any) => {
    if (!client.current.connected) {
      return;
    }

    client.current.publish({
      destination: "/pub/chat",
      body: JSON.stringify({ roomSeq: ROOM_SEQ, message }),
    });

    setMessage("");
  };
  return (
    <Outline>
      <Inner>
        <Header>
          {/* <div>
            <div>
              <input
                type={"text"}
                placeholder={"message"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.which === 13 && publish(message)}
              />
              <button onClick={() => publish(message)}>send</button>
            </div>
          </div> */}
        </Header>
        {/* <div>
          {chatMessages && chatMessages.length > 0 && (
            <div>
              {chatMessages.map((_chatMessage: any, index: any) => (
                <Message userName="doodream" src={DefaultImage} key={index}>
                  {_chatMessage.message}
                </Message>
              ))}
            </div>
          )}
        </div> */}
        <Message src={DefaultImage} userName="doodream">
          hello!
        </Message>
        {/* <Message>
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
        </Message> */}
        <MessageInput
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.which === 13 && publish(message)}
          value={message}
        />
      </Inner>
    </Outline>
  );
};

export { ChatRoom };
