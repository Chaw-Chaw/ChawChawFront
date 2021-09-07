import { Layout } from "../../components/common";
import ChatRoom from "../../components/chat/ChatRoom";
import ChatList from "../../components/chat/ChatList";
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
import { DEFAULT_PROFILE_IMAGE, BACKEND_URL } from "../../constants";
import { useCookies } from "react-cookie";
import { ChatContext, RoomType, MessageType } from "../../store/ChatContext";
import { ScreenContext } from "../../store/ScreenContext";

export default function Chat() {
  const { user, grantRefresh, accessToken } = useContext(AuthContext);
  const { windowSize } = useContext(ScreenContext);
  const {
    mainRoomId,
    setMainRoomId,
    mainChatMessages,
    setMainChatMessages,
    totalMessage,
    setTotalMessage,
  } = useContext(ChatContext);
  const router = useRouter();
  const message = useAlert();

  const client = useRef<any>({});
  const roomIds = useRef<number[]>([]);

  const getUserMessageLog = async (userId: number) => {
    const response = await axios
      .post(
        "/chat/room",
        { userId: userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
            Accept: "application/json",
          },
        }
      )
      .catch((err) => err.response);
    console.log(response, "getUserMessageLog");
    dataProcess(response, userId);
    connect();
  };

  const getMessageLog = async () => {
    const response = await axios
      .get(BACKEND_URL + "/chat/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
          Accept: "application/json",
        },
      })
      .catch((err) => err.response);

    console.log(response, "getMessageLog");
    dataProcess(response, -1);
    connect();
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
      grantRefresh();
      return;
    }
    if (!res.data.isSuccess) {
      console.log(res.data, "chatError");
      console.error(res.data);
      return;
    }

    const tmpTotalMessage: RoomType[] = res.data.data;
    if (userId !== -1) {
      const mainMessageLog = tmpTotalMessage.find(
        (item) => item.senderId === userId
      );
      const roomId = mainMessageLog ? mainMessageLog.roomId : -1;
      if (mainMessageLog) {
        setMainChatMessages(mainMessageLog.messages);
      }
      setMainRoomId(roomId);
    }
    setTotalMessage(res.data.data);
    roomIds.current = res.data.data.map((item: any) => item.roomId);
  };

  //@stomp/stompjs 는 typescript 지원 안함
  const connect = () => {
    client.current = new StompJs.Client({
      // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
      webSocketFactory: () => new SockJS(BACKEND_URL + "/ws/chat"), // proxy를 통한 접속
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        // 모든 subscribe는 여기서 구독이 이루어집니다.
        roomIds.current.forEach((item) => {
          chatRoomSubscribe(item);
        });
        waitChannelSubscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
      connectHeaders: {
        Authorization: accessToken,
        ws_path: "alarm",
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const chatRoomSubscribe = (roomId: number) => {
    const subscription = client.current.subscribe(
      `/queue/chat/room/${roomId}`,
      (response: any) => {
        const message: MessageType = JSON.parse(response.body);
        console.log(response, "subscribe");
        setMainChatMessages((pre: MessageType[]) => [...pre, message]);

        // 채팅방을 삭제해야할 경우
        if (message.messageType === "EXIT") {
          setTotalMessage((pre) => {
            const result = [...pre];
            const removeChatRoomIndex = result.findIndex(
              (item) => message.roomId === item.roomId
            );
            if (result.length === 1) return [];
            if (removeChatRoomIndex) {
              console.log(result, "before");
              result.splice(removeChatRoomIndex, 1);
              console.log(result, "after");
            }
            return [...result];
          });
          subscription.unsubscribe();
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
      }
    );
  };

  const waitChannelSubscribe = () => {
    client.current.subscribe(
      `/queue/chat/room/wait/${user.id}`,
      (response: any) => {
        const message: MessageType = JSON.parse(response.body);
        // 채팅룸 개설
        chatRoomSubscribe(message.roomId);
        const newChatList = {
          imageUrl: message.imageUrl,
          messages: [message],
          roomId: message.roomId,
          sender: message.sender,
          senderId: message.senderId,
        };
        setTotalMessage((pre) => [...pre, newChatList]);
      }
    );
  };

  const publish = (message: string, messageType: string) => {
    if (!client.current.connected) return;

    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const now = new Date(Date.now() - timezoneOffset);

    client.current.publish({
      destination: "/message",
      headers: { authorization: accessToken },
      body: JSON.stringify({
        messageType,
        roomId: mainRoomId,
        senderId: user.id,
        sender: user.name,
        regDate: now.toISOString().substring(0, 19),
        message,
        imageUrl: user.imageUrl,
        isRead: true,
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

  useEffect(() => {
    if (!accessToken) {
      message.error("로그인 후에 서비스를 이용해주세요.", {
        onClose: () => {
          router.push("/account/login");
        },
      });
    }

    // 컴포넌트가 unmount 할때 cleanup 함수 : 컴포넌트가 안보이게될때 실행시켜주는 함수
    return () => disconnect();
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

  // 메인룸 변경
  useEffect(() => {
    console.log(mainRoomId, "메인 룸 변경");
    const mainChatLog = totalMessage.find((item) => item.roomId === mainRoomId);
    if (!mainChatLog) return;
    const isMyMessage = mainChatLog.messages.find(
      (item) => item.senderId === user.id
    );
    if (!isMyMessage) {
      publish(`${user.name}님이 입장하셨습니다.`, "ENTER");
    }
    setMainChatMessages([...mainChatLog.messages]);
  }, [mainRoomId]);

  return (
    <Layout>
      <Container>
        <ChatRoom publish={publish} disconnect={disconnect} />
        {windowSize > 1000 ? <ChatList /> : null}
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  /* max-width: 500px;
  @media (max-width: 500px) {
    max-width: 320px;
  } */
  justify-content: center;
`;
