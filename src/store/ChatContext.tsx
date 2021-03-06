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
      // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // ????????? ????????? ?????? ??????
      webSocketFactory: () => new SockJS(BACKEND_URL + "/ws"), // proxy??? ?????? ??????
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        if (!chatClient.current.connected) return;
        // ?????? subscribe??? ????????? ????????? ??????????????????.
        chatClient.current.subscribe(`/queue/chat/${user.id}`, (response) => {
          const message: MessageType = JSON.parse(response.body);

          // ?????? ???????????? ????????? ???????????? ?????? ?????? ??????
          if (userBlockIds.current?.includes(message.senderId)) {
            return;
          }

          // ?????? ????????? ????????? ?????? : ????????? ??? ????????? ?????? ???????????? ??????
          if (message.roomId === mainRoomRef.current.id) {
            dispatch(chatActions.stackupMainChatMessages(message));
          }

          // ?????????????????? ???????????? ????????? ?????? ?????? ????????? ??????
          if (message.roomId !== mainRoomRef.current.id) {
            dispatch(chatActions.unShiftupNewMessages(message));
          }

          // ????????? ?????? : ???????????? ??? ????????? ????????? ?????? ???????????????

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

          // ?????? ???????????? ???????????? ???????????? ??????

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
    // ?????? ??? ?????? api ??????;
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

    // ?????? ???????????? ?????? ????????? ????????? ??????
    if (pathname === CHAT_PAGE_URL) {
      dispatch(chatActions.organizeMainChat());
    }

    if (mainRoom.id === INITIAL_ROOMID) return;
    dispatch(chatActions.filterNewMessages());
  }, [mainRoom.id, dispatch, pathname, isConnect]);

  useEffect(() => {
    if (!isLogin()) return;
    // user.id ??? ????????? ??????
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
      // ????????? ????????????
      if (isBlockUser.current && blockedRoomId.current) {
        dispatch(
          chatActions.updateMainRoom({
            id: blockedRoomId.current,
            userId,
          })
        );
        dispatch(organizeChatMessages());
      } else if (userId !== INITIAL_ID) {
        // ???????????? ?????? ?????????
        (async () => {
          try {
            let mainRoomId = INITIAL_ROOMID;
            const roomId = await dispatch(confirmChatRoom(userId)).unwrap();
            // ???????????? ????????? ????????? ?????????
            if (roomId === INITIAL_ROOMID) {
              mainRoomId = await dispatch(makeChatRoom(userId)).unwrap();
            } else {
              mainRoomId = roomId;
            }
            // ???????????? ????????? ?????? ??????????????? ??????
            dispatch(
              chatActions.updateMainRoom({ id: mainRoomId, userId: userId })
            );

            await dispatch(organizeChatMessages());
            // ???????????? ???????????? ?????? ????????? ?????????
            dispatch(chatActions.filterNewMessages());
          } catch (error) {
            dispatch(asyncErrorHandle(error));
          }
        })();
      } else {
        // ?????? ???????????? ????????? ??????
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
