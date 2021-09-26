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
import { arrayRemovedItem } from "../utils";

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
  totalMessage: RoomType[];
  mainRoomId: number;
  setMainChatMessages: Dispatch<SetStateAction<MessageType[]>>;
  setMainRoomId: Dispatch<SetStateAction<number>>;
  setTotalMessage: Dispatch<SetStateAction<RoomType[]>>;
  newMessages: Object[];
  setNewMessages: Dispatch<React.SetStateAction<Object[]>>;
  newLikes: Object[];
  setNewLikes: Dispatch<React.SetStateAction<Object[]>>;
  isViewChatList: boolean;
  setIsViewChatList: Dispatch<React.SetStateAction<boolean>>;
  publish: (message: string, messageType: string) => void;
  blockUser: (userId: number) => Promise<true | undefined>;
  unblockUser: (userId: number) => Promise<true | undefined>;
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
  newLikes: [],
  setNewLikes: () => {},
  isViewChatList: false,
  setIsViewChatList: () => {},
  publish: (message: string, messageType: string) => {},
  blockUser: (userId: number) => new Promise(() => {}),
  unblockUser: (userId: number) => new Promise(() => {}),
});

const ChatContextProvider: React.FC = (props) => {
  const [mainChatMessages, setMainChatMessages] = useState<MessageType[]>([]);
  const [totalMessage, setTotalMessage] = useState<RoomType[]>([]);
  const [mainRoomId, setMainRoomId] = useState(-1);
  const [newMessages, setNewMessages] = useState<Object[]>([]);
  const [newLikes, setNewLikes] = useState<Object[]>([]);
  const [isViewChatList, setIsViewChatList] = useState(false);
  const mainRoomIdRef = useRef(-1);
  const chatClient = useRef<any>({});
  const roomIdsRef = useRef<number[]>([]);
  const { user, accessToken, grantRefresh, updateUser } =
    useContext(AuthContext);

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
        console.error(frame);
      },
      connectHeaders: {
        Authorization: accessToken,
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
      // if (user.blockIds?.includes(message.senderId)) {
      //   return;
      // }

      // 메인 채팅룸 메세지 누적 : 메세지 룸 넘버가 메인 룸넘버인 경우
      if (message.roomId === mainRoomIdRef.current) {
        setMainChatMessages((pre: MessageType[]) => [...pre, message]);
      }

      // 메인채팅방의 메세지가 아닐시 에만 알람 메세지 누적
      if (message.roomId !== mainRoomIdRef.current) {
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
    if (!accessToken || !user) return;
    getNewAlarms();
    connect();
    // useEffect() cleanup 함수
    return () => disconnect();
  }, [user]);

  useEffect(() => {
    console.log(mainRoomId, "메인룸변경");
    mainRoomIdRef.current = mainRoomId;

    if (mainRoomId === -1) return;
    // 메인 룸 변경 api 전송;
    detectMainRoom();

    // // 메인룸 진입시 메인룸에 해당하는 새로운 메세지들 삭제
    // setNewMessages((pre) => {
    //   const result = pre;
    //   const filteredNewMessages =
    // });

    // 메인룸에 해당하는 새로운 메시지 거르기
    setNewMessages((pre) => {
      const result = pre;
      const filteredNewMessages = result.filter((item: any) => {
        if (item.roomId === undefined) return true;
        if (item.roomId !== mainRoomId) return true;
        return false;
      });
      return filteredNewMessages;
    });
  }, [mainRoomId]);

  const blockUser = async (userId: number) => {
    const response = await axios
      .post(
        `/users/block`,
        { userId },
        {
          headers: {
            Authorization: accessToken,
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
      .delete(`/users/block/${userId}`, {
        headers: {
          Authorization: accessToken,
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

  useEffect(() => {
    // totalMessage에 들어있는 룸id 추출
    if (totalMessage.length > 0) {
      const roomIds: number[] = [];
      totalMessage.forEach((item) => roomIds.push(item.roomId));
      roomIdsRef.current = roomIds;
    }
  }, [totalMessage]);

  const contextValue: ChatContextObj = {
    mainChatMessages,
    totalMessage,
    mainRoomId,
    setMainChatMessages,
    setMainRoomId,
    setTotalMessage,
    newMessages,
    setNewMessages,
    isViewChatList,
    setIsViewChatList,
    publish,
    newLikes,
    setNewLikes,
    blockUser,
    unblockUser,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
export type { RoomType, MessageType, LikeAlarmType };
