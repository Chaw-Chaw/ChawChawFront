import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ConfirmChatRoomType,
  GetAlarmsType,
  LikeAlarmType,
  MakeChatRoomType,
  MessageType,
  RoomType,
} from "../types/chat";
import {
  BACKEND_URL,
  CHAT_PAGE_URL,
  CONFIRM_CHATROOM_API_URL,
  ERROR_FILE_OVERSIZE_MSG,
  ERROR_NOFILE_MSG,
  GET_ALARMS_API_URL,
  GET_MESSAGES_API_URL,
  INITIAL_ID,
  LEAVE_CHATROOM_API_URL,
  MAKE_CHATROOM_API_URL,
  NOTICE_MAINROOM_API_URL,
  SEND_IMAGE_MSG_API_URL,
  TRANSLATE_CONTEXT,
} from "../constants";
import { RootState } from ".";
import { request } from "../utils/request";
import { DefaultResponseBody } from "../types/response";
import Router from "next/router";
import { ChangeEvent } from "react";
import axios from "axios";

const initialState: {
  isConnect: boolean;
  mainChatMessages: MessageType[];
  totalMessages: RoomType[];
  mainRoom: { id: number; userId: number };
  newMessages: MessageType[];
  newLikes: LikeAlarmType[];
  isViewChatList: boolean;
  roomIds: number[];
} = {
  isConnect: false,
  mainChatMessages: [],
  totalMessages: [],
  mainRoom: { id: -2, userId: -1 },
  newMessages: [],
  newLikes: [],
  isViewChatList: false,
  roomIds: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
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
    updateConnect(state) {
      state.isConnect = true;
    },
    updateDisConnect(state) {
      state.isConnect = false;
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
  }
);

export const noticeMainRoom = createAsyncThunk(
  "chat/noticeMainRoom",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const roomId = state.chat.mainRoom.id;
    await request.post(NOTICE_MAINROOM_API_URL, {
      roomId,
    });
  }
);

export const makeChatRoom = createAsyncThunk(
  "chat/makeChatRoom",
  async (userId: number) => {
    const response = await request.post<DefaultResponseBody<MakeChatRoomType>>(
      MAKE_CHATROOM_API_URL,
      { userId }
    );
    return response.data.data.roomId;
  }
);

export const confirmChatRoom = createAsyncThunk(
  "chat/confirmChatRoom",
  async (userId: number) => {
    const response = await request.get<
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
    return imageUrl;
  }
);

export const translateContext = createAsyncThunk(
  "chat/translateContext",
  async (contextInfo: { context: string; selectLanguage: string }) => {
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
