import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LikeAlarmType, MessageType, RoomType } from "../types/chat";

const initialState: {
  mainChatMessages: MessageType[];
  totalMessages: RoomType[];
  mainRoom: { id: number; userId: number };
  newMessages: MessageType[];
  newLikes: LikeAlarmType[];
  isViewChatList: boolean;
} = {
  mainChatMessages: [],
  totalMessages: [],
  mainRoom: { id: -1, userId: -1 },
  newMessages: [],
  newLikes: [],
  isViewChatList: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateMainChatMessages(state, action: PayloadAction<MessageType[]>) {
      state.mainChatMessages = action.payload;
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
    updateNewMessages(state, action: PayloadAction<MessageType[]>) {
      state.newMessages = action.payload;
    },
    updateNewLikes(state, action: PayloadAction<LikeAlarmType[]>) {
      state.newLikes = action.payload;
    },
    updateIsViewChatList(state, action: PayloadAction<boolean>) {
      state.isViewChatList = action.payload;
    },
  },
});
