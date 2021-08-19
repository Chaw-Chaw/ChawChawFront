import { Message, MessageInput } from ".";
import styled from "styled-components";
import DefaultImage from "../../../public/Layout/btsSugar.jpeg";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { useController } from "react-hook-form";
import { AuthContext } from "../../store/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";

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
  const client = useRef<any>({});
  const [chatMessages, setChatMessages] = useState<any>([]);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const [mainRoomId, setMainRoomId] = useState(4);
  const [chatListInfo, setChatListInfo] = useState<any>([]);

  const getMessageLog = async (roomId: string) => {
    // const messageLog = await axios
    //   .get(`/chat/${roomId}`, {
    //     headers: {
    //       "Content-type": "application/json",
    //       Authorization: `${user?.token}`,
    //       Accept: "application/json",
    //     },
    //   })
    //   .then((res) => {
    //     if (!res.data.isSuccess) throw new Error(res.data);
    //     console.log(res.data);
    //     return res.data.data;
    //   })
    //   .catch((err) => console.error(err));
  };

  const getUserMessageLog = async (userId: number) => {
    const response = await axios
      .post(
        "/chat/room",
        { userId: userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${user?.token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (!res.data.isSuccess) {
          throw new Error(res.data);
        }
        console.log(res.data, "getUserMessageLog");
        const messageLog = res.data.data;
        const mainMessageLog = messageLog.find(
          (item: any) => (item.senderId = userId)
        );
        console.log(mainMessageLog, "MainmessageLog");
        setChatMessages((chatMessage: any) => [
          ...chatMessage,
          ...mainMessageLog.messages,
        ]);
        setChatListInfo([...messageLog]);
        const roomId = mainMessageLog.roodId;
        connect(roomId);
        setMainRoomId(roomId);
        return () => disconnect();
      })
      .catch((err) => console.error(err));

    return response;
  };
  useEffect(() => {
    const userId = router.query.userId
      ? Number(router.query.userId)
      : undefined;
    if (userId !== undefined) {
      getUserMessageLog(userId);
    }
  }, [router.query]);

  const connect = (roomId: string) => {
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
        subscribe(roomId);
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

  const subscribe = (roomId: string) => {
    client.current.subscribe(`/queue/chat/room/${roomId}`, (response: any) => {
      const message = JSON.parse(response.body);
      console.log(response, "subscribe");
      setChatMessages((chatMessage: any) => [...chatMessage, message]);
    });
  };

  const publish = (message: any) => {
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const now = new Date(Date.now() - timezoneOffset);
    if (!client.current.connected) {
      return;
    }
    client.current.publish({
      destination: "/message",
      body: JSON.stringify({
        roomId: mainRoomId,
        senderId: user.id,
        sender: user.name,
        regDate: now.toISOString().substring(0, 19),
        message,
      }),
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
                console.log(chatMessage, "message");
                if (user.id === chatMessage.senderId) {
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
