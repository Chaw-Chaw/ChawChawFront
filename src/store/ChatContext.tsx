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
import {
  BACKEND_URL,
  DEFAULT_PROFILE_IMAGE,
  INITIAL_ID,
  LOGIN_PAGE_URL,
} from "../constants";
import { AuthContext } from "./AuthContext";
import { getSecureLocalStorage } from "../utils";
import { useChat } from "../hooks/api/chat/useChat";
import { LikeAlarmType, MessageType, RoomType } from "../../types/chat";
import { useAlert } from "react-alert";

interface ChatContextObj {
  mainChatMessages: MessageType[];
  setMainChatMessages: Dispatch<SetStateAction<MessageType[]>>;
  totalMessage: RoomType[];
  setTotalMessage: Dispatch<SetStateAction<RoomType[]>>;
  mainRoom: { id: number; userId: number };
  setMainRoom: Dispatch<SetStateAction<{ id: number; userId: number }>>;
  newMessages: MessageType[];
  setNewMessages: Dispatch<React.SetStateAction<MessageType[]>>;
  newLikes: LikeAlarmType[];
  setNewLikes: Dispatch<React.SetStateAction<LikeAlarmType[]>>;
  isViewChatList: boolean;
  setIsViewChatList: Dispatch<React.SetStateAction<boolean>>;
  publish: (message: string, messageType: string) => void;
  organizeMainChat: (totalMessage: RoomType[], mainRoomId: number) => void;
  organizeChatMessages: (mainRoomId: number) => Promise<void>;
}

const ChatContext = React.createContext<ChatContextObj>({
  mainChatMessages: [],
  totalMessage: [],
  mainRoom: { id: -1, userId: -1 },
  setMainChatMessages: () => {},
  setMainRoom: () => {},
  setTotalMessage: () => {},
  newMessages: [],
  setNewMessages: () => {},
  newLikes: [],
  setNewLikes: () => {},
  isViewChatList: false,
  setIsViewChatList: () => {},
  publish: (message: string, messageType: string) => {},
  organizeMainChat: () => {},
  organizeChatMessages: () => new Promise(() => {}),
});

const ChatContextProvider: React.FC = (props) => {
  const [mainChatMessages, setMainChatMessages] = useState<MessageType[]>([]);
  const [totalMessage, setTotalMessage] = useState<RoomType[]>([]);
  const [mainRoom, setMainRoom] = useState({ id: -2, userId: -1 });
  const [newMessages, setNewMessages] = useState<MessageType[]>([]);
  const [newLikes, setNewLikes] = useState<LikeAlarmType[]>([]);
  const [isViewChatList, setIsViewChatList] = useState(false);
  const mainRoomRef = useRef({ id: -1, userId: -1 });
  const chatClient = useRef<any>({});
  const roomIdsRef = useRef<number[]>([]);
  const { user, isLogin } = useContext(AuthContext);
  const { noticeMainRoom, getNewAlarms, getMessageLog } = useChat();
  const alertMessage = useAlert();

  const connect = () => {
    chatClient.current = new StompJs.Client({
      // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
      webSocketFactory: () => new SockJS(BACKEND_URL + "/ws"), // proxy를 통한 접속
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        // 모든 subscribe는 여기서 구독이 이루어집니다.
        alarmChannelSubscribe();
        likeChannelSubscribe();
        loginChannelSubscribe();
      },
      onStompError: (frame) => {
        console.log(frame, "connect error");
        connect();
      },
      connectHeaders: {
        Authorization: getSecureLocalStorage("accessToken"),
      },
    });

    chatClient.current.activate();
  };

  const disconnect = () => {
    chatClient.current.deactivate();
  };

  const loginChannelSubscribe = () => {
    chatClient.current.subscribe(`/queue/login/${user.id}`, (response: any) => {
      const message = response.body;

      if (message === "duplicated") {
        alertMessage.error(
          "현재 같은 아이디로 다른 곳에서 접속 중입니다. 계속 이용하시려면 다시 로그인 해주세요.",
          {
            onClose: () => {
              window.localStorage.removeItem("accessToken");
              window.localStorage.removeItem("expireAtAccessToken");
              window.localStorage.removeItem("user");
              window.localStorage.href = LOGIN_PAGE_URL;
            },
          }
        );
      }
    });
  };

  const alarmChannelSubscribe = () => {
    chatClient.current.subscribe(`/queue/chat/${user.id}`, (response: any) => {
      const message: MessageType = JSON.parse(response.body);
      console.log(message, "새로운 메세지 내용");

      // 블록 리스트에 추가된 메세지는 알람 받지 않음
      if (user.blockIds?.includes(message.senderId)) {
        return;
      }

      // 메인 채팅룸 메세지 누적 : 메세지 룸 넘버가 메인 룸넘버인 경우
      if (message.roomId === mainRoomRef.current.id) {
        setMainChatMessages((pre: MessageType[]) => [...pre, message]);
      }

      // 메인채팅방의 메세지가 아닐시 에만 알람 메세지 누적
      if (message.roomId !== mainRoomRef.current.id) {
        setNewMessages((pre) => [message, ...pre]);
      }

      // 채팅룸 개설 : 메시지의 룸 넘버가 기존에 없던 룸넘버라면
      if (!roomIdsRef.current.includes(message.roomId)) {
        const myImage = user.imageUrl || DEFAULT_PROFILE_IMAGE;
        const myName = user.name || "";
        const myId = user.id || INITIAL_ID;
        const newChatList: RoomType = {
          participantImageUrls: [message.imageUrl, myImage],
          messages: [message],
          roomId: message.roomId,
          participantNames: [message.sender, myName],
          participantIds: [message.senderId, myId],
        };
        setTotalMessage((pre) => [...pre, newChatList]);
        return;
      }

      // 기존 채팅방에 들어오는 메세지일 경우
      setTotalMessage((pre) => {
        const result: RoomType[] = [];
        pre.forEach((item) => {
          if (message.roomId === item.roomId) {
            result.push({ ...item, messages: [...item.messages, message] });
            return;
          }
          result.push(item);
          return;
        });
        return result;
      });
    });
  };

  const likeChannelSubscribe = () => {
    chatClient.current.subscribe(`/queue/like/${user.id}`, (response: any) => {
      const message: LikeAlarmType = JSON.parse(response.body);
      setNewLikes((pre) => [...pre, message]);
    });
  };

  const publish = (message: string, messageType: string) => {
    if (!chatClient.current.connected) return;
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const now = new Date(Date.now() - timezoneOffset);

    chatClient.current.publish({
      destination: "/message",
      body: JSON.stringify({
        messageType,
        roomId: mainRoom.id,
        senderId: user.id,
        sender: user.name,
        regDate: now.toISOString().substring(0, 19),
        message,
        imageUrl: user.imageUrl,
        isRead: true,
      }),
    });
  };

  const organizeMainChat = (totalMessage: RoomType[], mainRoomId: number) => {
    const mainChatLog = totalMessage.find((item) => item.roomId === mainRoomId);
    if (!mainChatLog) return;
    // 메인 채팅메세지 set
    setMainChatMessages([...mainChatLog.messages]);
  };

  //mainRoomId을 인수로 받지 말고 그냥 mainRoom으로 받아도 되지않나?
  const organizeChatMessages = async (mainRoomId: number) => {
    const totalMessage = await getMessageLog();
    if (!totalMessage) return;
    // 토탈 메세지 저장
    setTotalMessage(totalMessage);
    // 메인 채팅내용 저장
    organizeMainChat(totalMessage, mainRoomId);
  };

  useEffect(() => {
    // user.id 가 있으면 연결
    if (!isLogin || !user.id) return;
    if (user.role === "ADMIN") return;

    (async () => {
      await getNewAlarms();
      connect();
    })();

    return () => disconnect();
  }, [user.id, isLogin, user.role]);

  useEffect(() => {
    if (mainRoom.id === -2) return;
    console.log(mainRoom.id, "메인룸변경");
    mainRoomRef.current.id = mainRoom.id;

    // 메인 룸 변경 api 전송;
    (async () => {
      await noticeMainRoom();
    })();

    if (mainRoom.id === -1) return;
    // 메인룸에 해당하는 새로운 메시지 거르기
    setNewMessages((pre) => {
      const result = pre;
      const filteredNewMessages = result.filter((item: any) => {
        if (item.roomId === undefined) return true;
        if (item.roomId !== mainRoom.id) return true;
        return false;
      });
      return filteredNewMessages;
    });
  }, [mainRoom.id]);

  //새로운 방이 생기면
  useEffect(() => {
    // totalMessage에 들어있는 룸id 추출
    if (totalMessage.length > 0) {
      const roomIds: number[] = [];
      totalMessage.forEach((item) => roomIds.push(item.roomId));
      roomIdsRef.current = roomIds;
    }
  }, [totalMessage.length]);

  const contextValue: ChatContextObj = {
    mainChatMessages,
    setMainChatMessages,
    totalMessage,
    setTotalMessage,
    mainRoom,
    setMainRoom,
    newMessages,
    setNewMessages,
    isViewChatList,
    setIsViewChatList,
    publish,
    newLikes,
    setNewLikes,
    organizeChatMessages,
    organizeMainChat,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
export type { RoomType, MessageType, LikeAlarmType };
