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
import { AuthContext, UserPropertys } from "../../store/AuthContext";
import { useRouter } from "next/router";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { debounce } from "lodash";
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
  const [user, setUser] = useState(
    (() => {
      if (typeof window === "undefined") return {};
      const localStorageUser = window.localStorage.getItem("user");
      if (!localStorageUser) return {};
      return JSON.parse(localStorageUser);
    })()
  );

  const [mainChatMessages, setMainChatMessages] = useState<any>([]);
  const [totalMessage, setTotalMessage] = useState<any>([]);
  const roomIds = useRef<number[]>([]);
  const [mainRoomId, setMainRoomId] = useState(-1);
  const mainRoomIdRef = useRef(-1);
  const [yourProfileImage, setYourProfileImage] = useState(
    "https://d2anzi03nvjlav.cloudfront.net/default.png"
  );
  const router = useRouter();
  const client = useRef<any>({});
  const message = useAlert();

  const [windowSize, setWindowSize] = useState(
    (() => {
      if (typeof window === "undefined") return 1000;
      return window.innerWidth;
    })()
  );

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
      .catch((err) => err.response);
    console.log(response, "getUserMessageLog");
    dataProcess(response, userId);
    connect();
    return () => disconnect();
  };

  const getMessageLog = async () => {
    const response = await axios
      .get(`https://mylifeforcoding.com/chat/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${user?.token}`,
          Accept: "application/json",
        },
      })
      .catch((err) => err.response);

    console.log(response, "getMessageLog");
    dataProcess(response, -1);
    connect();
    return () => disconnect();
  };

  const dataProcess = (res: AxiosResponse, userId: number) => {
    // console.log(res.status, "statuscode");
    if (res.status === 403) {
      message.error("프로필을 작성해주세요.", {
        onClose: () => {
          router.push("/account/profile");
        },
      });
    }
    if (res.status === 401) {
      // access token 만료
      // refresh token 전송
    }
    if (!res.data.isSuccess) {
      console.log(res.data, "chatError");
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
        setMainChatMessages((pre: any) => {
          const newMessages = sortMessage;

          return newMessages;
        });
      }
      setMainRoomId(roomId);
      setYourProfileImage(mainMessageLog.imageUrl);
    }

    setTotalMessage(res.data.data);
    roomIds.current = tmpTotalMessage.map((item: any) => {
      return item.roomId;
    });
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
        roomIds.current.forEach((item) => {
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
    const thisRoomId = Number(destination.split("/").pop());
    client.current.subscribe(destination, (response: any) => {
      const message = JSON.parse(response.body);
      console.log(response, "subscribe");
      // 메인 채팅룸이면 메인채팅 메세지에 저장
      console.log(message.roomId, mainRoomIdRef.current, "이게 맞냐");
      if (message.roomId === mainRoomIdRef.current) {
        setMainChatMessages((chatMessage: any) => [...chatMessage, message]);
      }

      // 새로운 채팅방이 생성되었을 경우
      if (thisRoomId === user.id) {
        subscribe(`/queue/chat/room/${message.roomId}`);
        const newChatList = {
          imageUrl: message.imageUrl,
          messages: [message],
          roomId: message.roomId,
          sender: message.sender,
          senderId: message.senderId,
        };
        setTotalMessage((pre: any) => [...pre, newChatList]);
        return;
      }

      // 채팅방을 삭제해야할 경우
      if (message.messageType === "EXIT") {
        setTotalMessage((pre: any) => {
          const result = [...pre];
          const removeChatRoomIndex = result.findIndex(
            (item: any) => message.roomId === item.roomId
          );
          if (removeChatRoomIndex) {
            console.log(result, "before");
            result.splice(removeChatRoomIndex, 1);
            console.log(result, "after");
          }
          return [...result];
        });
        client.current.unsubscribe();
        return;
      }

      // 기존 채팅방에 들어오는 메세지일 경우
      setTotalMessage((pre: any) => {
        const result: any = [];
        pre.forEach((item: any) => {
          if (message.roomId === item.roomId) {
            result.push({ ...item, messages: [...item.messages, message] });
            return;
          }
          result.push(item);
          return;
        });
        console.log(result, "after");
        return result;
      });
      return;
    });
  };

  const publish = (message: any, messageType: string) => {
    if (!client.current.connected) {
      return;
    }
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const now = new Date(Date.now() - timezoneOffset);
    client.current.publish({
      destination: "/message",
      body: JSON.stringify({
        messageType,
        roomId: mainRoomId,
        senderId: user.id,
        sender: user.name,
        regDate: now.toISOString().substring(0, 19),
        message,
      }),
    });
    console.log("메세지 전송 선공");
  };

  const publishEnterChat = () => {
    setTimeout(() => {
      const isInMyMessage = mainChatMessages.find(
        (item: any) => item.senderId === user.id
      );
      if (!isInMyMessage) publish(`${user.name}님이 입장하셨습니다.`, "ENTER");
    }, 500);
  };

  const handleResize = debounce(() => {
    setWindowSize(window.innerWidth);
  }, 200);

  useEffect(() => {
    const isLogin = user.token;
    if (!isLogin) {
      message.error("로그인 후 서비스를 이용해주세요.", {
        onClose: () => {
          router.push("/account/login");
        },
      });
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (JSON.stringify(router.query) === JSON.stringify({})) return;
    const userId = router.query.userId
      ? Number(router.query.userId)
      : undefined;
    if (userId === undefined) return;
    if (userId !== -1) {
      getUserMessageLog(userId);
      publishEnterChat();
    } else {
      getMessageLog();
      setMainChatMessages([]);
    }
  }, [JSON.stringify(router.query)]);

  useEffect(() => {
    console.log(mainRoomId, "왜그러지");
    mainRoomIdRef.current = mainRoomId;
    const mainChatLog = totalMessage.find(
      (item: any) => item.roomId === mainRoomId
    );
    if (!mainChatLog) return;
    const isMyMessage = mainChatLog.messages.find(
      (item: any) => item.senderId === user.id
    );
    if (!isMyMessage) {
      publish(`${user.name}님이 입장하셨습니다.`, "ENTER");
    }
    console.log(mainChatLog, "mainChatLog");
    setMainChatMessages([...mainChatLog.messages]);
  }, [mainRoomId]);

  // useEffect(() => {
  //   console.log(mainChatMessages, "mainChatMessage");
  // }, [JSON.stringify(mainChatMessages)]);

  return (
    <Layout>
      <Container>
        <ChatRoom
          chatMessage={mainChatMessages}
          yourProfileImage={yourProfileImage}
          roomId={mainRoomId}
          publish={publish}
          disconnect={disconnect}
          setMainRoomId={setMainRoomId}
        />
        {windowSize > 1000 ? (
          <ChatRoomList
            setMainRoomId={setMainRoomId}
            totalMessage={totalMessage}
            mainRoomId={mainRoomId}
          />
        ) : null}
      </Container>
    </Layout>
  );
}
