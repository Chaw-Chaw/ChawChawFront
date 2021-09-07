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

interface FollowAlarmType {
  followType: String; // FOLLOW, UNFOLLOW
  name: String;
  regDate: String;
}
interface MessageType {
  messageType: string;
  roomId: number;
  senderId: number;
  sender: string;
  regDate: string;
  message: string;
  imageUrl: string;
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
  newMessages: Object[];
  setNewMessages: Dispatch<React.SetStateAction<Object[]>>;
}

const ChatContext = React.createContext<ChatContextObj>({
  mainChatMessages: [],
  totalMessage: [],
  mainRoomId: -1,
  setMainChatMessages: () => {},
  setMainRoomId: () => {},
  setTotalMessage: () => {},
  newMessages: [],
  setNewMessages: () => {},
});

const ChatContextProvider: React.FC = (props) => {
  const [mainChatMessages, setMainChatMessages] = useState<MessageType[]>([]);
  const [totalMessage, setTotalMessage] = useState<RoomType[]>([]);
  const [mainRoomId, setMainRoomId] = useState(-1);
  const [newMessages, setNewMessages] = useState<Object[]>([]);
  const messageAlarmClient = useRef<any>({});
  const { user } = useContext(AuthContext);

  const connect = () => {
    messageAlarmClient.current = new StompJs.Client({
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
    });
    disconnect();
    messageAlarmClient.current.activate();
  };

  const disconnect = () => {
    messageAlarmClient.current.deactivate();
  };

  const alarmChannelSubscribe = () => {
    messageAlarmClient.current.subscribe(
      `/queue/alarm/chat/${user.id}`,
      (response: any) => {
        const message: MessageType = JSON.parse(response.body);
        console.log(message, "새로운 메세지 내용");
        setNewMessages((pre) => [...pre, message]);
      }
    );
  };

  const followChannelSubscribe = () => {
    messageAlarmClient.current.subscribe(
      `/queue/alarm/follow/${user.id}`,
      (response: any) => {
        const message: FollowAlarmType = JSON.parse(response.body);

        console.log(message, "새로운 팔로우 내용");
        setNewMessages((pre) => [...pre, message]);
      }
    );
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const contextValue: ChatContextObj = {
    mainChatMessages,
    totalMessage,
    mainRoomId,
    setMainChatMessages,
    setMainRoomId,
    setTotalMessage,
    newMessages,
    setNewMessages,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
export type { RoomType, MessageType };
