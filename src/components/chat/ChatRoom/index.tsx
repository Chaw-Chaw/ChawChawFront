import styled from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import ChatMessage from "../Message/ChatMessage";
import { RiWechat2Line } from "react-icons/ri";
import { AuthContext } from "../../../store/AuthContext";
import { ChatContext } from "../../../store/ChatContext";
import ChatList from "../ChatList";
import { INITIAL_ROOMID } from "../../../constants";
import { ChatRoomHeader } from "./ChatRoomHeader";

const ChatRoom: React.FC = (props) => {
  const { mainRoom, mainChatMessages, isViewChatList, publish } =
    useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState<string>("");
  const [selectLanguage, setSelectLanguage] = useState<string[]>(["Korean"]);
  const chatMessageBox = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (message === "") return;
    publish(message, "TALK");
    setMessage("");
  };

  const scrollToBottom = () => {
    if (!chatMessageBox.current) return;
    chatMessageBox.current.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [JSON.stringify(mainChatMessages)]);

  return (
    <Outline>
      <Inner>
        <ChatRoomHeader
          selectLanguage={selectLanguage}
          setSelectLanguage={setSelectLanguage}
        />
        {/* use Memo 적용할것 */}
        {isViewChatList ? (
          <ChatListWrapper>
            <ChatList />
          </ChatListWrapper>
        ) : (
          <>
            <MessageContainer>
              {(() => {
                if (mainRoom.id !== INITIAL_ROOMID) {
                  if (mainChatMessages.length > 0) {
                    return (
                      <div ref={chatMessageBox}>
                        {mainChatMessages.map((chatMessage, index) => {
                          // 토크 타입인 일반메세지 분류
                          return (
                            <ChatMessage
                              userId={chatMessage.senderId}
                              key={index}
                              src={
                                user.id === chatMessage.senderId
                                  ? undefined
                                  : `${chatMessage.imageUrl}`
                              }
                              imageUrl={
                                chatMessage.messageType === "IMAGE"
                                  ? chatMessage.message
                                  : undefined
                              }
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
                  }
                } else {
                  return (
                    <EmptyChatRoom>
                      <EmptyChatRoomBox>
                        <RiWechat2Line />
                        <EmptyChatRoomTitle>
                          채팅방에 입장해주세요
                        </EmptyChatRoomTitle>
                      </EmptyChatRoomBox>
                    </EmptyChatRoom>
                  );
                }
              })()}
            </MessageContainer>
            <MessageInput
              onChange={(e) => setMessage(e.target.value)}
              sendMessage={sendMessage}
              value={message}
            />
          </>
        )}
      </Inner>
    </Outline>
  );
};

export default ChatRoom;

const Outline = styled.div`
  border: none;
  box-sizing: border-box;
  height: calc(100vh - 150px);
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
`;

const MessageContainer = styled.div`
  height: calc(100% - 102px);
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  overflow: auto;
  @media (max-width: 768px) {
    height: 100%;
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
    display: initial;
  }
`;
