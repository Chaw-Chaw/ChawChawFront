import { Layout } from "../../components/common";
import {
  Message,
  MessageInput,
  ChatRoom,
  ChatRoomList,
} from "../../components/chat";
import styled from "styled-components";
import DefaultImage from "../../../public/Layout/btsSugar.jpeg";
import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useRouter } from "next/router";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { CgNpm } from "react-icons/cg";
import { addConsoleHandler } from "selenium-webdriver/lib/logging";
import { useAlert } from "react-alert";

const Container = styled.div`
  display: flex;
  width: 100%;
  /* max-width: 500px;
  @media (max-width: 500px) {
    max-width: 320px;
  } */
  justify-content: center;
`;

export default function Chat() {
  const { user } = useContext(AuthContext);
  // const [user, setUser] = useState<any>({});
  const [mainChatMessages, setMainChatMessages] = useState<any>([]);
  const [totalMessage, setTotalMessage] = useState<any>([]);
  const [roomIds, setRoomIds] = useState<number[]>([]);
  const [mainRoomId, setMainRoomId] = useState(-1);
  const [yourProfileImage, setYourProfileImage] = useState("default.png");
  const router = useRouter();
  const client = useRef<any>({});
  // const [userToken, setUserToken]

  const getUserMessageLog = async (userId: number) => {
    const response = await axios.post(
      "/chat/room",
      { userId: userId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${user?.token}`,
          Accept: "application/json",
        },
      }
    );
    console.log(response, "getUserMessageLog");
    dataProcess(response, userId);
  };

  const getMessageLog = async () => {
    const response = await axios.get(`https://mylifeforcoding.com/chat/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${user?.token}`,
        Accept: "application/json",
      },
    });
    console.log(response, "getMessageLog");
    dataProcess(response, -1);
  };

  const dataProcess = (res: AxiosResponse, userId: number) => {
    if (!res.data.isSuccess) {
      console.error(res.data);
      return;
    }
    const tmpTotalMessage = res.data.data;

    if (userId !== -1) {
      const mainMessageLog = tmpTotalMessage.find(
        (item: any) => item.senderId === userId
      );
      const roomId = mainMessageLog.roomId;
      if (mainMessageLog) {
        const sortMessage = mainMessageLog.messages;
        setMainChatMessages(sortMessage);
      }
      // 채팅리스트 중복 생성 제거
      setMainRoomId(roomId);
      setYourProfileImage(mainMessageLog.imageUrl);
    }

    setTotalMessage([...res.data.data]);
    console.log(tmpTotalMessage, "totalMessage");
    setRoomIds(
      tmpTotalMessage.map((item: any) => {
        return item.roomId;
      })
    );
  };

  const connect = () => {
    client.current = new StompJs.Client({
      // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
      webSocketFactory: () => new SockJS("https://mylifeforcoding.com/ws"), // proxy를 통한 접속
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        roomIds.forEach((item) => {
          subscribe(`/queue/chat/room/${item}`);
        });
        subscribe(`/queue/chat/room/wait/${user.id}`);
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

  const subscribe = (destination: string) => {
    client.current.subscribe(destination, (response: any) => {
      const message = JSON.parse(response.body);
      console.log(response, "subscribe");
      if (Number(message.roomId) === Number(mainRoomId)) {
        setMainChatMessages((chatMessage: any) => [...chatMessage, message]);
      }
      setTotalMessage((pre: any) => {
        const result = pre.map((item: any) => {
          if (message.senderId === item.senderId) {
            item.messages.push(message);
            return item;
          }
          return item;
        });
        return result;
      });
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
  };

  // useEffect(() => {
  //   const user = window.localStorage.getItem("user");
  //   if (user) {

  //   }
  // }, []);

  useEffect(() => {
    // if (!user.token) return;
    // console.log(user, "soso");

    const userId = router.query.userId
      ? Number(router.query.userId)
      : undefined;
    if (userId !== undefined) {
      getUserMessageLog(userId);
    } else {
      getMessageLog();
    }
  }, [router.query]);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [roomIds]);

  return (
    <Layout>
      <Container>
        <ChatRoom
          chatMessage={mainChatMessages}
          yourProfileImage={yourProfileImage}
          roomId={mainRoomId.toString()}
          publish={publish}
        />
        <ChatRoomList totalMessage={totalMessage} mainRoomId={mainRoomId} />
      </Container>
    </Layout>
  );
}
