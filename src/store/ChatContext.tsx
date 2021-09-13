import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { BACKEND_URL } from "../constants";
import { AuthContext } from "./AuthContext";
import axios from "axios";

interface FollowAlarmType {
  followType: string; // FOLLOW, UNFOLLOW
  name: string;
  regDate: string;
}
interface MessageType {
  messageType: string;
  roomId: number;
  senderId: number;
  sender: string;
  regDate: string;
  message: string;
  imageUrl: string;
  isRead: boolean;
}

interface RoomType {
  roomId: number;
  senderId: number;
  sender: string;
  messages: MessageType[];
  imageUrl: string;
}

interface ChatContextObj {
  mainChatMessages: MessageType[];
  totalMessage: RoomType[];
  mainRoomId: number;
  setMainChatMessages: Dispatch<SetStateAction<MessageType[]>>;
  setMainRoomId: Dispatch<SetStateAction<number>>;
  setTotalMessage: Dispatch<SetStateAction<RoomType[]>>;
  newAlarms: Object[];
  setNewAlarms: Dispatch<React.SetStateAction<Object[]>>;
  isViewChatList: boolean;
  setIsViewChatList: Dispatch<React.SetStateAction<boolean>>;
  publish: (message: string, messageType: string) => void;
  publishEnterChat: () => void;
  roomIds: number[];
  setRoomIds: Dispatch<React.SetStateAction<number[]>>;
}

const ChatContext = React.createContext<ChatContextObj>({
  mainChatMessages: [],
  totalMessage: [],
  mainRoomId: -1,
  setMainChatMessages: () => {},
  setMainRoomId: () => {},
  setTotalMessage: () => {},
  newAlarms: [],
  setNewAlarms: () => {},
  isViewChatList: false,
  setIsViewChatList: () => {},
  publish: (message: string, messageType: string) => {},
  publishEnterChat: () => {},
  roomIds: [],
  setRoomIds: () => {},
});

const ChatContextProvider: React.FC = (props) => {
  const [mainChatMessages, setMainChatMessages] = useState<MessageType[]>([]);
  const [totalMessage, setTotalMessage] = useState<RoomType[]>([]);
  const [mainRoomId, setMainRoomId] = useState(-1);
  const [newAlarms, setNewAlarms] = useState<Object[]>([]);
  const [isViewChatList, setIsViewChatList] = useState(false);
  const [roomIds, setRoomIds] = useState<number[]>([]);

  const chatClient = useRef<any>({});

  const { user, accessToken, grantRefresh } = useContext(AuthContext);

  const connect = () => {
    chatClient.current = new StompJs.Client({
      // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
      webSocketFactory: () => new SockJS(BACKEND_URL + "/ws/alarm"), // proxy를 통한 접속
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        // 모든 subscribe는 여기서 구독이 이루어집니다.
        alarmChannelSubscribe();
        followChannelSubscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
      connectHeaders: {
        Authorization: accessToken,
        "ws-path": "alarm",
      },
    });

    chatClient.current.activate();
  };

  const disconnect = () => {
    chatClient.current.deactivate();
  };

  const alarmChannelSubscribe = () => {
    chatClient.current.subscribe(
      `/queue/alarm/chat/${user.id}`,
      (response: any) => {
        const message: MessageType = JSON.parse(response.body);
        console.log(message, "새로운 메세지 내용");
        const newRoomId = totalMessage.find(
          (item) => item.roomId === message.roomId
        );

        // 메인 채팅룸 메세지 누적 : 메세지 룸 넘버가 메인 룸넘버인 경우
        if (message.roomId === mainRoomId) {
          setMainChatMessages((pre: MessageType[]) => [...pre, message]);
        }

        // 내가 보낸 메세지가 아닌경우에만 알람 메세지 누적
        if (message.senderId !== user.id) {
          setNewAlarms((pre) => [...pre, message]);
        }

        // 채팅룸 개설 : 메시지의 룸 넘버가 기존에 없던 룸넘버라면
        if (newRoomId !== undefined) {
          const newChatList: RoomType = {
            imageUrl: message.imageUrl,
            messages: [message],
            roomId: message.roomId,
            sender: message.sender,
            senderId: message.senderId,
          };
          setTotalMessage((pre) => [...pre, newChatList]);
          return;
        }

        // 채팅방을 삭제해야할 경우
        if (message.messageType === "EXIT") {
          setTotalMessage((pre) => {
            const result = [...pre];
            const removeChatRoomIndex = result.findIndex(
              (item) => message.roomId === item.roomId
            );
            if (result.length === 1) return [];
            if (removeChatRoomIndex) {
              result.splice(removeChatRoomIndex, 1);
            }
            return [...result];
          });
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

  const followChannelSubscribe = () => {
    chatClient.current.subscribe(
      `/queue/alarm/follow/${user.id}`,
      (response: any) => {
        const message: FollowAlarmType = JSON.parse(response.body);
        console.log(message, "새로운 팔로우 내용");
        setNewAlarms((pre) => [...pre, message]);
      }
    );
  };

  const detectMainRoom = async () => {
    const response = await axios
      .post(
        "/chat/room/enter",
        { roomId: mainRoomId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
            Accept: "application/json",
          },
        }
      )
      .catch((err) => {
        console.error(err);
        return err.response;
      });

    if (response.status === 401) {
      grantRefresh();
    }

    if (!response.data.isSuccess) {
      console.log(response.data, "메인룸 디텍트 api 전송 실패");
    }
  };

  const publish = (message: string, messageType: string) => {
    if (!chatClient.current.connected) return;

    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const now = new Date(Date.now() - timezoneOffset);

    chatClient.current.publish({
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
      // console.log(
      //   mainChatMessages,
      //   isInMyMessage,
      //   "내가 들어간 입장메세지 타이밍"
      // );
      if (!isInMyMessage) publish(`${user.name}님이 입장하셨습니다.`, "ENTER");
    }, 500);
  };

  const getNewAlarms = async () => {
    const response = await axios
      .get("/users/alarm", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .catch((err) => {
        console.log(err, "새로운 메세지 받아오기 실패");
        return err.response;
      });
    if (response.status === 401) {
      grantRefresh();
      return;
    }
    console.log(response, "새로운 메세지 데이터");
    const followMessages: FollowAlarmType[] = response.data.follows;
    const newAlarms = response.data.messages;
    setNewAlarms([...newAlarms, ...followMessages]);
  };

  useEffect(() => {
    if (!accessToken || !user) return;
    getNewAlarms();
    connect();
    // useEffect() cleanup 함수
    return () => disconnect();
  }, [user]);

  useEffect(() => {
    // 메인 룸 변경 api 전송;
    if (mainRoomId === -1) return;
    detectMainRoom();
    setNewAlarms((pre) => {
      const result = pre;
      const filteredNewAlarms = result.filter((item: any) => {
        console.log(item.roomId, mainRoomId, "메세지 필터링");
        if (item.roomId === undefined) return true;
        if (item.roomId !== mainRoomId) return true;
        return false;
      });
      return filteredNewAlarms;
    });
  }, [mainRoomId]);

  useEffect(() => {
    console.log(newAlarms, "newAlarms 업데이트");
    // 알림은 최대 6개까지 보여주기?
  }, [JSON.stringify(newAlarms)]);

  const contextValue: ChatContextObj = {
    mainChatMessages,
    totalMessage,
    mainRoomId,
    setMainChatMessages,
    setMainRoomId,
    setTotalMessage,
    newAlarms,
    setNewAlarms,
    isViewChatList,
    setIsViewChatList,
    publish,
    publishEnterChat,
    roomIds,
    setRoomIds,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
export type { RoomType, MessageType, FollowAlarmType };
