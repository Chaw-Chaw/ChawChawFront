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
  newFollows: Object[];
  setNewFollows: Dispatch<React.SetStateAction<Object[]>>;
  isViewChatList: boolean;
  setIsViewChatList: Dispatch<React.SetStateAction<boolean>>;
  publish: (message: string, messageType: string) => void;
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
  newFollows: [],
  setNewFollows: () => {},
  isViewChatList: false,
  setIsViewChatList: () => {},
  publish: (message: string, messageType: string) => {},
});

const ChatContextProvider: React.FC = (props) => {
  const [mainChatMessages, setMainChatMessages] = useState<MessageType[]>([]);
  const [totalMessage, setTotalMessage] = useState<RoomType[]>([]);
  const [mainRoomId, setMainRoomId] = useState(-1);
  const [newMessages, setNewMessages] = useState<Object[]>([]);
  const [newFollows, setNewFollows] = useState<Object[]>([]);
  const [isViewChatList, setIsViewChatList] = useState(false);
  const mainRoomIdRef = useRef(-1);
  const chatClient = useRef<any>({});
  const roomIdsRef = useRef<number[]>([]);
  const { user, accessToken, grantRefresh } = useContext(AuthContext);

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
        followChannelSubscribe();
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

      // 메인 채팅룸 메세지 누적 : 메세지 룸 넘버가 메인 룸넘버인 경우
      if (message.roomId === mainRoomIdRef.current) {
        setMainChatMessages((pre: MessageType[]) => [...pre, message]);
      }

      // 메인채팅방의 메세지가 아닐시 에만 알람 메세지 누적
      if (message.roomId !== mainRoomIdRef.current) {
        setNewMessages((pre) => [...pre, message]);
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

      // 채팅방을 삭제해야할 경우
      if (message.messageType === "EXIT") {
        setTotalMessage((pre) => {
          const result = pre;
          const removeChatRoomIndex = result.findIndex(
            (item) => message.roomId === item.roomId
          );
          if (removeChatRoomIndex) {
            const removeChatRoom = result[removeChatRoomIndex];
            const removeIndex = removeChatRoom.participantIds.findIndex(
              (item) => item === message.senderId
            );

            removeChatRoom.participantIds.splice(removeIndex);
            removeChatRoom.participantImageUrls.splice(removeIndex);
            removeChatRoom.participantNames.splice(removeIndex);
            result[removeChatRoomIndex] = removeChatRoom;
          }
          console.log(result);
          return [...result];
        });
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

  const followChannelSubscribe = () => {
    chatClient.current.subscribe(
      `/queue/follow/${user.id}`,
      (response: any) => {
        const message: FollowAlarmType = JSON.parse(response.body);
        // console.log(message, "새로운 팔로우 내용");
        setNewFollows((pre) => [...pre, message]);
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
    const followMessages: FollowAlarmType[] = response.data.follows;
    const newMessages = response.data.messages;
    setNewFollows([...followMessages]);
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
    newFollows,
    setNewFollows,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
export type { RoomType, MessageType, FollowAlarmType };
