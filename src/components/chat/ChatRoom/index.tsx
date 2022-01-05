import styled from "styled-components";
import React, {
  ChangeEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import MessageInput from "./MessageInput";
import ChatMessage from "../Message/ChatMessage";
import { RiWechat2Line } from "react-icons/ri";
import ChatList from "../ChatList";
import {
  IMAGE_TYPE,
  INITIAL_ROOMID,
  MESSAGE_TYPE_TALK,
} from "../../../constants";
import { ChatRoomHeader } from "./ChatRoomHeader";
import { useAppSelector } from "../../../hooks/redux";
import { ChatContext } from "../../../store/ChatContext";

const ChatRoom: React.FC = () => {
  const { mainRoom, mainChatMessages, isViewChatList } = useAppSelector(
    (state) => state.chat
  );
  const { publish } = useContext(ChatContext);
  const user = useAppSelector((state) => state.auth.user);
  const [message, setMessage] = useState<string>("");
  const [selectLanguage, setSelectLanguage] = useState<string[]>(["Korean"]);
  const chatMessageBox = useRef<HTMLDivElement>(null);

  const userImageUrl = useCallback(
    (senderId: number, imageUrl: string) => {
      if (user.id !== senderId) {
        return imageUrl;
      } else {
        return undefined;
      }
    },
    [user.id]
  );

  const chatImageUrl = useCallback((type: string, message: string) => {
    if (type === IMAGE_TYPE) {
      return message;
    } else {
      return undefined;
    }
  }, []);

  const handleChangeInput: ChangeEventHandler<HTMLTextAreaElement> =
    useCallback((e) => {
      setMessage(e.target.value);
    }, []);

  const sendMessage = useCallback(() => {
    if (message === "") return;
    publish(message, MESSAGE_TYPE_TALK);
    setMessage("");
  }, [message, publish]);

  const scrollToBottom = useCallback(() => {
    if (!chatMessageBox.current) return;
    chatMessageBox.current.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [mainChatMessages.length, scrollToBottom]);

  const emptyChatRoom = (
    <EmptyChatRoom>
      <EmptyChatRoomBox>
        <RiWechat2Line />
        <EmptyChatRoomTitle>채팅방에 내용이 없습니다.</EmptyChatRoomTitle>
      </EmptyChatRoomBox>
    </EmptyChatRoom>
  );

  const chatMessages = (
    <div ref={chatMessageBox}>
      {mainChatMessages.map((chatMessage, index) => {
        // 토크 타입인 일반메세지 분류
        return (
          <ChatMessage
            userId={chatMessage.senderId}
            key={index + chatMessage.roomId}
            src={userImageUrl(chatMessage.senderId, chatMessage.imageUrl)}
            imageUrl={chatImageUrl(
              chatMessage.messageType,
              chatMessage.message
            )}
            regDate={chatMessage.regDate}
            context={chatMessage.message}
            selectLanguage={selectLanguage}
            userName={chatMessage.sender}
            messageType={chatMessage.messageType}
            scrollToBottom={scrollToBottom}
          />
        );
      })}
    </div>
  );

  const messageBoxContent =
    mainRoom.id !== INITIAL_ROOMID && mainChatMessages.length > 0
      ? chatMessages
      : emptyChatRoom;
  return (
    <Outline>
      <Inner>
        <ChatRoomHeader
          selectLanguage={selectLanguage}
          setSelectLanguage={setSelectLanguage}
        />
        {isViewChatList ? (
          <ChatListWrapper>
            <ChatList />
          </ChatListWrapper>
        ) : (
          <>
            <MessageContainer>{messageBoxContent}</MessageContainer>
            <MessageInput
              onChange={handleChangeInput}
              sendMessage={sendMessage}
              value={message}
            />
          </>
        )}
      </Inner>
    </Outline>
  );
};

export default React.memo(ChatRoom);

const Outline = styled.div`
  border: none;
  box-sizing: border-box;
  min-height: calc(100vh - 150px);
  /* margin-bottom: 50px; */
  width: 100%;
  max-width: 600px;
  @media (max-width: 768px) {
    position: fixed;
    top: 120px;
    height: calc(100% - 170px);
  }
  @media (max-width: 500px) {
    min-width: 320px;
  }
`;

const Inner = styled.div`
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
  position: relative;
  @media (max-width: 1024px) {
    overflow: auto;
    box-sizing: border-box;
    height: 100%;
    position: relative;
  }
`;

const MessageContainer = styled.div`
  position: absolute;
  top: 50px;
  height: calc(100% - 102px);
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  overflow: auto;
  @media (max-width: 1024px) {
    position: absolute;
    top: 50px;
    height: calc(100% - 102px);
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    overflow: auto;
  }
  @media (max-width: 768px) {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    overflow: auto;
  }
`;

const EmptyChatRoom = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const EmptyChatRoomBox = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.secondaryColor};
  svg {
    font-size: 10rem;
  }
`;

const EmptyChatRoomTitle = styled.h1`
  margin: auto;
`;

const ChatListWrapper = styled.div`
  display: none;
  @media (max-width: 1024px) {
    position: absolute;
    top: 50px;
    width: 100%;
    height: calc(100% - 102px);
    display: flex;
    overflow: auto;
  }
  @media (max-width: 768px) {
    display: flex;
    position: inherit;
    top: inherit;
    width: inherit;
    height: inherit;
    overflow: auto;
  }
`;
