import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
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
} from "../../constants";
import {
  ConfirmChatRoomType,
  GetAlarmsType,
  MakeChatRoomType,
  RoomType,
} from "../../types/chat";
import { DefaultResponseBody } from "../../types/response";
import { request } from "../../utils/request";
import { chatActions } from "../chatSlice";
import Router from "next/router";
import { ChangeEvent } from "react";
import axios from "axios";

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
  async (mainRoomId: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const isConnect = state.chat.isConnect;
    console.log(mainRoomId, isConnect, "noticeMainRoom");
    await request.post(NOTICE_MAINROOM_API_URL, {
      roomId: mainRoomId,
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
    await new Promise(() => thunkAPI.dispatch(chatActions.filterTotalMessages));
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
