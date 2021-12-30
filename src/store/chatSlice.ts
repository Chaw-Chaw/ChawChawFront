import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ConfirmChatRoomType,
  GetAlarmsType,
  LikeAlarmType,
  MakeChatRoomType,
  MessageType,
  RoomType,
} from "../types/chat";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
  BACKEND_URL,
  CHAT_PAGE_URL,
  CONFIRM_CHATROOM_API_URL,
  CONFIRM_INIT_LOGOUT,
  DEFAULT_PROFILE_IMAGE,
  ERROR_ALERT,
  ERROR_CODES,
  ERROR_DUPLOGIN_MSG,
  ERROR_FILE_OVERSIZE_MSG,
  ERROR_NOFILE_MSG,
  EXCEPT_ERRORCODES_MSG,
  GET_ALARMS_API_URL,
  GET_MESSAGES_API_URL,
  IMAGE_TYPE,
  INITIAL_ID,
  LEAVE_CHATROOM_API_URL,
  MAKE_CHATROOM_API_URL,
  NOTICE_MAINROOM_API_URL,
  SEND_IMAGE_MSG_API_URL,
  TRANSLATE_CONTEXT,
} from "../constants";
import store, { RootState } from ".";
import { getSecureLocalStorage } from "../utils";
import { alertActions, asyncErrorHandle } from "./alertSlice";
import { request } from "../utils/request";
import { DefaultResponseBody } from "../types/response";
import Router from "next/router";
import { ChangeEvent } from "react";
import axios from "axios";

const initialState: {
  mainChatMessages: MessageType[];
  totalMessages: RoomType[];
  mainRoom: { id: number; userId: number };
  newMessages: MessageType[];
  newLikes: LikeAlarmType[];
  isViewChatList: boolean;
  chatClient: any;
  roomIds: number[];
} = {
  mainChatMessages: [],
  totalMessages: [],
  mainRoom: { id: -1, userId: -1 },
  newMessages: [],
  newLikes: [],
  isViewChatList: false,
  chatClient: {},
  roomIds: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    connect(state) {
      state.chatClient = new StompJs.Client({
        // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
        webSocketFactory: () => new SockJS(BACKEND_URL + "/ws"), // proxy를 통한 접속
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        //   onConnect: () => {
        //     // 모든 subscribe는 여기서 구독이 이루어집니다.
        //     alarmChannelSubscribe();
        //     likeChannelSubscribe();
        //     loginChannelSubscribe();
        //   },
        connectHeaders: {
          Authorization: getSecureLocalStorage("accessToken"),
        },
      });
    },
    disconnect(state) {
      state.chatClient.deactivate();
    },
    publish(
      state,
      action: PayloadAction<{ message: string; messageType: string }>
    ) {
      if (!state.chatClient.connected) return;
      const messageType = action.payload.messageType;
      const message = action.payload.message;
      const timezoneOffset = new Date().getTimezoneOffset() * 60000;
      const now = new Date(Date.now() - timezoneOffset);
      const user = store.getState().auth.user;

      state.chatClient.publish({
        destination: "/message",
        body: JSON.stringify({
          messageType,
          roomId: state.mainRoom.id,
          senderId: user.id,
          sender: user.name,
          regDate: now.toISOString().substring(0, 19),
          message,
          imageUrl: user.imageUrl,
          isRead: true,
        }),
      });
    },
    stackupMainChatMessages(state, action: PayloadAction<MessageType>) {
      state.mainChatMessages.push(action.payload);
    },
    stackupNewChatList(state, action: PayloadAction<RoomType>) {
      const roomIds: number[] = [];
      state.totalMessages.push(action.payload);
      state.totalMessages.forEach((item) => roomIds.push(item.roomId));
      state.roomIds = roomIds;
    },
    stackupTotalMessages(state, action: PayloadAction<MessageType>) {
      const result: RoomType[] = [];
      const newMessage = action.payload;
      const preState = state.totalMessages;
      preState.forEach((item) => {
        if (newMessage.roomId === item.roomId) {
          result.push({
            ...item,
            messages: [...item.messages, newMessage],
          });
        } else {
          result.push(item);
        }
      });
      state.totalMessages = result;
    },
    stackupNewLikes(state, action: PayloadAction<LikeAlarmType>) {
      state.newLikes.push(action.payload);
    },
    unShiftupNewMessages(state, action: PayloadAction<MessageType>) {
      state.newMessages.unshift(action.payload);
    },
    updateTotalMessages(state, action: PayloadAction<RoomType[]>) {
      state.totalMessages = action.payload;
    },
    updateMainRoom(
      state,
      action: PayloadAction<{ id: number; userId: number }>
    ) {
      state.mainRoom = action.payload;
    },
    updateIsViewChatList(state) {
      const preState = state.isViewChatList;
      state.isViewChatList = !preState;
    },
    updateNewLikes(state, action: PayloadAction<LikeAlarmType[]>) {
      state.newLikes = action.payload;
    },
    updateNewMessages(state, action: PayloadAction<MessageType[]>) {
      state.newMessages = action.payload;
    },
    updateRoomIds(state) {
      const newRoomIds: number[] = [];
      state.totalMessages.forEach((item) => newRoomIds.push(item.roomId));
      state.roomIds = newRoomIds;
    },
    filterNewMessages(state) {
      const filteredNewMessages = state.newMessages.filter((item) => {
        if (item.roomId === undefined || item.roomId !== state.mainRoom.id) {
          return true;
        }
        return false;
      });
      state.newMessages = filteredNewMessages;
    },
    filterTotalMessages(state) {
      const preState = state.totalMessages;
      const result = preState.filter(
        (item) => item.roomId !== state.mainRoom.id
      );
      state.totalMessages = result;
    },
    organizeMainChat(state) {
      const { totalMessages, mainRoom } = state;
      const mainChatLog = totalMessages.find(
        (item) => item.roomId === mainRoom.id
      );
      if (!mainChatLog) return;
      state.mainChatMessages = [...mainChatLog.messages];
    },
  },
  extraReducers: (builder) => {},
});

export default chatSlice.reducer;
export const chatActions = chatSlice.actions;

export const likeChannelSubscribe = createAsyncThunk(
  "chat/likeChannelSubscribe",
  (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const chatClient = state.chat.chatClient;
    const user = state.auth.user;
    chatClient.subscribe(`/queue/like/${user.id}`, (response: any) => {
      const message: LikeAlarmType = JSON.parse(response.body);
      thunkAPI.dispatch(chatActions.stackupNewLikes(message));
    });
  }
);

export const loginChannelSubscribe = createAsyncThunk(
  "chat/loginChannelSubscribe",
  (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const chatClient = state.chat.chatClient;
    const userId = state.auth.user.id;
    chatClient.subscribe(`/queue/login/${userId}`, (response: any) => {
      const message = response.body;
      // 중복 접속했다는 메세지.
      if (message === "duplicated") {
        thunkAPI.dispatch(
          alertActions.updateAlert({
            name: ERROR_ALERT,
            message: ERROR_DUPLOGIN_MSG,
            confirmFuncName: CONFIRM_INIT_LOGOUT,
          })
        );
      }
    });
  }
);

export const alarmChannelSubscribe = createAsyncThunk(
  "chat/alarmChannelSubscribe",
  (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const chatClient = state.chat.chatClient;
    const user = state.auth.user;
    const { mainRoom, roomIds } = state.chat;

    chatClient.subscribe(`/queue/chat/${user.id}`, (response: any) => {
      const message: MessageType = JSON.parse(response.body);
      console.log(message, mainRoom, roomIds, "새로운 메세지 내용");

      // 블록 리스트에 추가된 메세지는 알람 받지 않음
      if (user.blockIds?.includes(message.senderId)) {
        return;
      }

      // 메인 채팅룸 메세지 누적 : 메세지 룸 넘버가 메인 룸넘버인 경우
      if (message.roomId === mainRoom.id) {
        thunkAPI.dispatch(chatActions.stackupMainChatMessages(message));
      }

      // 메인채팅방의 메세지가 아닐시 에만 알람 메세지 누적
      if (message.roomId !== mainRoom.id) {
        thunkAPI.dispatch(chatActions.unShiftupNewMessages(message));
      }

      // 채팅룸 개설 : 메시지의 룸 넘버가 기존에 없던 룸넘버라면
      if (!roomIds.includes(message.roomId)) {
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
        thunkAPI.dispatch(chatActions.stackupNewChatList(newChatList));
        return;
      }

      // 기존 채팅방에 들어오는 메세지일 경우
      thunkAPI.dispatch(chatActions.stackupTotalMessages(message));
    });
  }
);

export const publish = createAsyncThunk(
  "chat/publish",
  (messageInfo: { message: string; messageType: string }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { message, messageType } = messageInfo;
    const { chatClient, mainRoom } = state.chat;
    const user = state.auth.user;
    if (!chatClient.connected) return;
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
  }
);

export const organizeChatMessages = createAsyncThunk(
  "chat/organizeChatMessages",
  async (_, thunkAPI) => {
    const response = await request.get<DefaultResponseBody<RoomType[]>>(
      BACKEND_URL + GET_MESSAGES_API_URL
    );
    const totalMessages = response.data.data;
    if (!totalMessages) return;
    thunkAPI.dispatch(chatActions.updateTotalMessages(totalMessages));
    thunkAPI.dispatch(chatActions.updateRoomIds());
    thunkAPI.dispatch(chatActions.organizeMainChat());
  }
);

export const getNewAlarms = createAsyncThunk(
  "chat/getNewAlarms",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const user = state.auth.user;
      const response = await request.get<DefaultResponseBody<GetAlarmsType>>(
        GET_ALARMS_API_URL
      );
      const likeMessages = response.data.data.likes;
      const newMessages = response.data.data.messages.filter(
        (item) => !user.blockIds?.includes(item.senderId)
      );
      thunkAPI.dispatch(chatActions.updateNewLikes(likeMessages));
      thunkAPI.dispatch(chatActions.updateNewMessages(newMessages));
    } catch (error) {
      thunkAPI.dispatch(asyncErrorHandle(error));
    }
  }
);

export const noticeMainRoom = createAsyncThunk(
  "chat/noticeMainRoom",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const mainRoomId = state.chat.mainRoom.id;
      await request.post(NOTICE_MAINROOM_API_URL, {
        roomId: mainRoomId,
      });
    } catch (error) {
      thunkAPI.dispatch(asyncErrorHandle(error));
    }
  }
);

export const makeChatRoom = createAsyncThunk(
  "chat/makeChatRoom",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const userId = state.auth.user.id;
    const response = await request.post<DefaultResponseBody<MakeChatRoomType>>(
      MAKE_CHATROOM_API_URL,
      { userId }
    );
    return response.data.data.roomId;
  }
);

export const confirmChatRoom = createAsyncThunk(
  "chat/confirmChatRoom",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const userId = state.auth.user.id;
    const response = await request.post<
      DefaultResponseBody<ConfirmChatRoomType>
    >(CONFIRM_CHATROOM_API_URL + `/${userId}`);
    return response.data.data.roomId;
  }
);

export const leaveChat = createAsyncThunk(
  "chat/leaveChat",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const roomId = state.chat.mainRoom.id;
    await request.delete(LEAVE_CHATROOM_API_URL, { data: { roomId } });

    thunkAPI.dispatch(chatActions.filterTotalMessages);
    Router.push({
      pathname: CHAT_PAGE_URL,
      query: { userId: INITIAL_ID },
    });
  }
);

export const sendImageMessage = createAsyncThunk(
  "chat/sendImageMessage",
  async (e: ChangeEvent<HTMLInputElement>, thunkAPI) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file === undefined) throw new Error(ERROR_NOFILE_MSG);
    if (file.size > 1024 * 1024 * 5) {
      throw new Error(ERROR_FILE_OVERSIZE_MSG);
    }
    const image = new FormData();
    image.append("file", file);

    const response = await request.post<DefaultResponseBody<string>>(
      SEND_IMAGE_MSG_API_URL,
      image,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const imageUrl = response.data.data;
    thunkAPI.dispatch(publish({ message: imageUrl, messageType: IMAGE_TYPE }));
  }
);

export const translateContext = createAsyncThunk(
  "chat/translateContext",
  async (
    contextInfo: { context: string; selectLanguage: string },
    thunkAPI
  ) => {
    const response = await axios.get(TRANSLATE_CONTEXT, {
      params: {
        q: contextInfo.context,
        source: "",
        target: contextInfo.selectLanguage,
      },
    });

    return response.data.data.translations[0].translatedText;
  }
);
