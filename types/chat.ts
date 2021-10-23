import { DefaultResponse } from "./response";

export interface LikeAlarmType {
  likeType: string; // LIKE, UNLIKE
  name: string;
  regDate: string;
}

export interface MessageType {
  messageType: string;
  roomId: number;
  senderId: number;
  sender: string;
  regDate: string;
  message: string;
  imageUrl: string;
  isRead: boolean;
}

export interface RoomType {
  roomId: number;
  participantIds: number[];
  participantNames: string[];
  messages: MessageType[];
  participantImageUrls: string[];
}

export interface NoticeMainRoomResponse extends DefaultResponse {}
