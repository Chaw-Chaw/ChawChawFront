import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

export interface LikeAlarmType {
  likeType: string; // LIKE, UNLIKE
  name: string;
  regDate: string;
}

export interface ChatRoomHeaderType {
  selectLanguage: string[];
  setSelectLanguage: Dispatch<SetStateAction<string[]>>;
}
export interface MessageInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  sendMessage: () => void;
}

export interface MessageContextProps {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  type: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
export interface ChatMessageProps {
  src?: string;
  userName?: string;
  regDate: string;
  context: string;
  selectLanguage: string[];
  imageUrl?: string;
  userId: number;
  messageType: string;
  scrollToBottom: () => void;
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

export interface GetAlarmsType {
  messages: MessageType[];
  likes: LikeAlarmType[];
}

export interface MakeChatRoomType {
  roomId: number;
  roomName: string;
}

export interface ConfirmChatRoomType extends MakeChatRoomType {}

export interface MyMessageProps {
  regDate: string;
  context: string;
  selectLanguage: string[];
  imageUrl?: string;
  messageType: string;
  scrollToBottom: () => void;
}

export interface YourMessageProps extends MyMessageProps {
  src: string;
  userName?: string;
  userId: number;
}

export interface ChatBoxProps {
  imageUrl: string;
  regDate: string;
  sender: string;
  roomId?: number;
  context: string;
  senderId?: number;
  type: string;
}
