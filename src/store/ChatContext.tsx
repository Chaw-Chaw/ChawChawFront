import React, { Dispatch, SetStateAction, useState } from "react";

interface MessageType {
  messageType: string;
  roomId: number;
  senderId: number;
  sender: string;
  regDate: string;
  message: string;
  imageUrl: string;
}

interface RoomType {
  roomId: number;
  senderId: number;
  sender: string;
  messages: MessageType[];
  imageUrl: string;
}

interface ChatContextObj {
  mainChatMessages: MessageType[];
  totalMessage: RoomType[];
  mainRoomId: number;
  setMainChatMessages: Dispatch<SetStateAction<MessageType[]>>;
  setMainRoomId: Dispatch<SetStateAction<number>>;
  setTotalMessage: Dispatch<SetStateAction<RoomType[]>>;
  newMessages: String[];
  setNewMessages: React.Dispatch<String[]>;
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
});

const ChatContextProvider: React.FC = (props) => {
  const [mainChatMessages, setMainChatMessages] = useState<MessageType[]>([]);
  const [totalMessage, setTotalMessage] = useState<RoomType[]>([]);
  const [mainRoomId, setMainRoomId] = useState(-1);
  const [newMessages, setNewMessages] = useState<String[]>([]);

  const contextValue: ChatContextObj = {
    mainChatMessages,
    totalMessage,
    mainRoomId,
    setMainChatMessages,
    setMainRoomId,
    setTotalMessage,
    newMessages,
    setNewMessages,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
export type { RoomType, MessageType };
