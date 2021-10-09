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
import { BACKEND_URL, DEFAULT_PROFILE_IMAGE } from "../constants";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { arrayRemovedItem, getSecureLocalStorage } from "../utils";

import { useAlert } from "react-alert";
import { useRouter } from "next/router";

interface LikeAlarmType {
  likeType: string; // LIKE, UNLIKE
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
  participantIds: number[];
  participantNames: string[];
  messages: MessageType[];
  participantImageUrls: string[];
}

interface ChatContextObj {
  mainChatMessages: MessageType[];
  setMainChatMessages: Dispatch<SetStateAction<MessageType[]>>;
  totalMessage: RoomType[];
  setTotalMessage: Dispatch<SetStateAction<RoomType[]>>;
  mainRoom: { id: number; userId: number };
  setMainRoom: Dispatch<SetStateAction<{ id: number; userId: number }>>;
  newMessages: Object[];
  setNewMessages: Dispatch<React.SetStateAction<Object[]>>;
  newLikes: Object[];
  setNewLikes: Dispatch<React.SetStateAction<Object[]>>;
  isViewChatList: boolean;
  setIsViewChatList: Dispatch<React.SetStateAction<boolean>>;
  publish: (message: string, messageType: string) => void;
  blockUser: (userId: number) => Promise<true | undefined>;
  unblockUser: (userId: number) => Promise<true | undefined>;
  getMessageLog: () => Promise<any>;
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
  blockUser: (userId: number) => new Promise(() => {}),
  unblockUser: (userId: number) => new Promise(() => {}),
  getMessageLog: () => new Promise(() => {}),
  organizeMainChat: (totalMessage: RoomType[], mainRoomId: number) => {},
  organizeChatMessages: (mainRoomId: number) => new Promise(() => {}),
});

const ChatContextProvider: React.FC = (props) => {
  const [mainChatMessages, setMainChatMessages] = useState<MessageType[]>([]);
  const [totalMessage, setTotalMessage] = useState<RoomType[]>([]);
  const [mainRoom, setMainRoom] = useState({ id: -1, userId: -1 });
  const [newMessages, setNewMessages] = useState<Object[]>([]);
  const [newLikes, setNewLikes] = useState<Object[]>([]);
  const [isViewChatList, setIsViewChatList] = useState(false);
  const mainRoomRef = useRef({ id: -1, userId: -1 });
  const chatClient = useRef<any>({});
  const roomIdsRef = useRef<number[]>([]);
  const { user, grantRefresh, updateUser, isLogin } = useContext(AuthContext);
  const message = useAlert();
  const router = useRouter();

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
        const myId = user.id || -1;
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

  const detectMainRoom = async () => {
    const response = await axios
      .post(
        "/chat/room/enter",
        { roomId: mainRoom.id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: getSecureLocalStorage("accessToken"),
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
      return false;
    }
    return true;
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

  const getNewAlarms = async () => {
    const response = await axios
      .get("/users/alarm", {
        headers: {
          Authorization: getSecureLocalStorage("accessToken"),
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

    // 알림 목록은 차단된 아이디를 제외하고 받습니다.
    const likeMessages: LikeAlarmType[] = response.data.likes.filter(
      (item: any) => !user.blockIds?.includes(item.senderId)
    );
    const newMessages = response.data.messages.filter(
      (item: any) => !user.blockIds?.includes(item.senderId)
    );
    setNewLikes([...likeMessages]);
    setNewMessages([...newMessages]);
  };

  useEffect(() => {
    // 한가지 문제가 있다. -> connect를 다시 연결할때
    // user.id 가 있으면 연결
    if (!isLogin || !user.id) return;
    getNewAlarms();
    connect();
    return () => disconnect();
  }, [JSON.stringify(user.id)]);

  useEffect(() => {
    console.log(mainRoom.id, "메인룸변경");
    mainRoomRef.current.id = mainRoom.id;

    if (mainRoom.id === -1) return;

    // 메인 룸 변경 api 전송;
    (async () => {
      const result = await detectMainRoom();
      if (!result) return;
    })();

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
  }, [JSON.stringify(mainRoom.id)]);

  const blockUser = async (userId: number) => {
    const response = await axios
      .post(
        `/users/block`,
        { userId },
        {
          headers: {
            Authorization: getSecureLocalStorage("accessToken"),
          },
        }
      )
      .catch((err) => err.response);

    if (response.status === 401) {
      grantRefresh();
      return;
    }

    console.log(response, "유저 차단 결과");
    if (!response.data.isSuccess) {
      alert("유저 차단 실패");
      return;
    }

    const newBlockIds = user.blockIds || [];
    newBlockIds.push(userId);
    updateUser({ blockIds: newBlockIds });
    return true;
  };

  const unblockUser = async (userId: number) => {
    const response = await axios
      .delete("/users/block", {
        data: { userId: userId },
        headers: {
          Authorization: getSecureLocalStorage("accessToken"),
        },
      })
      .catch((err) => err.response);

    if (response.status === 401) {
      grantRefresh();
      return;
    }

    console.log(response, "유저 차단해제 결과");

    if (!response.data.isSuccess) {
      alert("유저 차단해제 실패");
      return;
    }

    const newBlockIds = arrayRemovedItem(userId, user.blockIds || []);
    updateUser({ blockIds: newBlockIds });
    return true;
  };

  // totalMessage 가져오기
  const getMessageLog = async () => {
    const response = await axios
      .get(BACKEND_URL + "/chat/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: getSecureLocalStorage("accessToken"),
          Accept: "application/json",
        },
      })
      .catch((err) => err.response);

    console.log(response, "getMessageLog");
    if (response.status === 403) {
      message.error("프로필을 작성해주세요.", {
        onClose: () => {
          router.push("/account/profile");
        },
      });
    }
    if (response.status === 401) {
      // access token 만료
      // refresh token 전송
      grantRefresh();
      return;
    }
    if (!response.data.isSuccess) {
      console.log(response.data, "chatError");
      console.error(response.data);
      return;
    }
    return response.data.data;
  };

  // 메인 채팅 내용 분류해서 넣기
  const organizeMainChat = (totalMessage: RoomType[], mainRoomId: number) => {
    const mainChatLog = totalMessage.find((item) => item.roomId === mainRoomId);
    if (!mainChatLog) return;
    // 메인 채팅메세지 set
    setMainChatMessages([...mainChatLog.messages]);
  };

  // 모든 채팅 메세지들 분류해서 넣기
  const organizeChatMessages = async (mainRoomId: number) => {
    const totalMessage = await getMessageLog();
    // 토탈 메세지 저장
    setTotalMessage(totalMessage);
    // 메인 채팅내용 저장
    organizeMainChat(totalMessage, mainRoomId);
  };

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
    blockUser,
    unblockUser,
    getMessageLog,
    organizeMainChat,
    organizeChatMessages,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
export type { RoomType, MessageType, LikeAlarmType };
