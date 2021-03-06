import React, { useCallback, useEffect, useRef } from "react";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
  BACKEND_URL,
  CHAT_PAGE_URL,
  CONFIRM_INIT_LOGOUT,
  DEFAULT_PROFILE_IMAGE,
  DUPLOGIN_TYPE,
  ERROR_ALERT,
  ERROR_DUPLOGIN_MSG,
  INITIAL_ID,
  INITIAL_MAINROOMID,
  INITIAL_ROOMID,
} from "../constants";
import { getSecureLocalStorage, isLogin } from "../utils";
import { LikeAlarmType, MessageType, RoomType } from "../types/chat";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { chatActions } from "./chatSlice";
import { alertActions } from "./alertSlice";
import { useRouter } from "next/router";
import {
  noticeMainRoom,
  confirmChatRoom,
  getNewAlarms,
  makeChatRoom,
  organizeChatMessages,
} from "./actions/chatActions";
import { asyncErrorHandle } from "./actions/alertActions";

interface ChatContextObj {
  publish: (message: string, messageType: string) => void;
}

const ChatContext = React.createContext<ChatContextObj>({
  publish: (message: string, messageType: string) => {},
});

const ChatContextProvider: React.FC = (props) => {
  const chatClient = useRef<StompJs.Client>(new StompJs.Client());
  const user = useAppSelector((state) => state.auth.user);
  const { mainRoom, roomIds, totalMessages, isConnect } = useAppSelector(
    (state) => state.chat
  );
  const mainRoomRef = useRef({ id: INITIAL_MAINROOMID, userId: INITIAL_ID });
  const roomIdsRef = useRef<number[]>([...roomIds]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = router.pathname;
  const routerQueryJSON = JSON.stringify(router.query);
  const emptyJSON = JSON.stringify({});
  const routerQueryUserId = Number(router.query.userId);
  const userBlockIds = useRef(user.blockIds);
  const isBlockUser = useRef(user.blockIds?.includes(routerQueryUserId));
  const blockedRoomId = useRef(
    totalMessages.find((item) =>
      item.participantIds.includes(routerQueryUserId)
    )?.roomId
  );

  const disconnect = useCallback(() => {
    if (!chatClient.current.connected) return;
    chatClient.current.deactivate();
  }, []);

  const connect = useCallback(async () => {
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
        if (!chatClient.current.connected) return;
        // 모든 subscribe는 여기서 구독이 이루어집니다.
        chatClient.current.subscribe(`/queue/chat/${user.id}`, (response) => {
          const message: MessageType = JSON.parse(response.body);

          // 블록 리스트에 추가된 메세지는 알람 받지 않음
          if (userBlockIds.current?.includes(message.senderId)) {
            return;
          }

          // 메인 채팅룸 메세지 누적 : 메세지 룸 넘버가 메인 룸넘버인 경우
          if (message.roomId === mainRoomRef.current.id) {
            dispatch(chatActions.stackupMainChatMessages(message));
          }

          // 메인채팅방의 메세지가 아닐시 에만 알람 메세지 누적
          if (message.roomId !== mainRoomRef.current.id) {
            dispatch(chatActions.unShiftupNewMessages(message));
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
            dispatch(chatActions.stackupNewChatList(newChatList));
            return;
          }

          // 기존 채팅방에 들어오는 메세지일 경우

          dispatch(chatActions.stackupTotalMessages(message));
        });

        chatClient.current.subscribe(`/queue/like/${user.id}`, (response) => {
          const message: LikeAlarmType = JSON.parse(response.body);
          dispatch(chatActions.stackupNewLikes(message));
        });
        chatClient.current.subscribe(`/queue/login/${user.id}`, (response) => {
          const message = response.body;

          if (message === DUPLOGIN_TYPE) {
            dispatch(
              alertActions.updateAlert({
                name: ERROR_ALERT,
                message: ERROR_DUPLOGIN_MSG,
                confirmFuncName: CONFIRM_INIT_LOGOUT,
              })
            );
          }
        });

        dispatch(chatActions.updateConnect());
      },
      onStompError: (frame) => {
        connect();
      },
      onDisconnect: () => {
        dispatch(chatActions.updateDisConnect());
        dispatch(
          chatActions.updateMainRoom({
            id: INITIAL_MAINROOMID,
            userId: INITIAL_ID,
          })
        );
      },
      connectHeaders: {
        Authorization: getSecureLocalStorage("accessToken"),
      },
    });

    chatClient.current.activate();
  }, [dispatch, user.id, user.imageUrl, user.name]);

  const publish = useCallback(
    (message: string, messageType: string) => {
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
    },
    [mainRoom.id, user.id, user.imageUrl, user.name]
  );

  useEffect(() => {
    if (!isConnect) return;
    if (mainRoom.id === INITIAL_MAINROOMID) return;
    mainRoomRef.current.id = mainRoom.id;
    // 메인 룸 변경 api 전송;
    (async () => {
      try {
        if (pathname !== CHAT_PAGE_URL) {
          mainRoomRef.current.id = INITIAL_ROOMID;
        }
        await dispatch(noticeMainRoom(mainRoomRef.current.id)).unwrap();
      } catch (error) {
        dispatch(asyncErrorHandle(error));
      }
    })();

    // 채팅 페이지면 메인 채팅룸 데이터 조직
    if (pathname === CHAT_PAGE_URL) {
      dispatch(chatActions.organizeMainChat());
    }

    if (mainRoom.id === INITIAL_ROOMID) return;
    dispatch(chatActions.filterNewMessages());
  }, [mainRoom.id, dispatch, pathname, isConnect]);

  useEffect(() => {
    if (!isLogin()) return;
    // user.id 가 있으면 연결
    (async () => {
      try {
        await dispatch(getNewAlarms());
        await new Promise(() => connect());
      } catch (error) {
        dispatch(asyncErrorHandle(error));
      }
    })();
    const userId = routerQueryUserId || undefined;
    if (
      pathname === CHAT_PAGE_URL &&
      routerQueryJSON !== emptyJSON &&
      userId !== undefined
    ) {
      // 차단된 유저라면
      if (isBlockUser.current && blockedRoomId.current) {
        dispatch(
          chatActions.updateMainRoom({
            id: blockedRoomId.current,
            userId,
          })
        );
        dispatch(organizeChatMessages());
      } else if (userId !== INITIAL_ID) {
        // 채팅방에 입장 한경우
        (async () => {
          try {
            let mainRoomId = INITIAL_ROOMID;
            const roomId = await dispatch(confirmChatRoom(userId)).unwrap();
            // 채팅방이 없다면 채팅방 만들기
            if (roomId === INITIAL_ROOMID) {
              mainRoomId = await dispatch(makeChatRoom(userId)).unwrap();
            } else {
              mainRoomId = roomId;
            }
            // 채팅방을 만들고 전체 메세지들을 받기
            dispatch(
              chatActions.updateMainRoom({ id: mainRoomId, userId: userId })
            );

            await dispatch(organizeChatMessages());
            // 메인룸에 해당하는 알림 메시지 거르기
            dispatch(chatActions.filterNewMessages());
          } catch (error) {
            dispatch(asyncErrorHandle(error));
          }
        })();
      } else {
        // 채팅 페이지만 입장한 경우
        dispatch(
          chatActions.updateMainRoom({ id: INITIAL_ROOMID, userId: INITIAL_ID })
        );
        (async () => {
          try {
            await dispatch(organizeChatMessages());
          } catch (error) {
            dispatch(asyncErrorHandle(error));
          }
        })();
      }
    }

    return () => disconnect();
  }, [
    dispatch,
    connect,
    disconnect,
    pathname,
    routerQueryJSON,
    routerQueryUserId,
    emptyJSON,
  ]);

  useEffect(() => {
    roomIdsRef.current = [...roomIds];
    userBlockIds.current = user.blockIds;
    isBlockUser.current = user.blockIds?.includes(routerQueryUserId);
    blockedRoomId.current = totalMessages.find((item) =>
      item.participantIds.includes(routerQueryUserId)
    )?.roomId;
  });

  const contextValue: ChatContextObj = {
    publish,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
