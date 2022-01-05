import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LikeAlarmType, MessageType, RoomType } from "../types/chat";

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
      state.totalMessages.push(action.payload);
      state.roomIds.push(action.payload.roomId);
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
        if (item.roomId === undefined) return true;
        if (item.roomId !== state.mainRoom.id) return true;
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
