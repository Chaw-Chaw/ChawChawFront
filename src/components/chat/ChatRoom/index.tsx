import styled from "styled-components";
import {
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import MessageInput from "./MessageInput";
import ChatMessage from "../Message/ChatMessage";
import InfoMessage from "../Message/InfoMessage";
import { BsBoxArrowRight } from "react-icons/bs";
import { RiHome2Line, RiWechat2Line } from "react-icons/ri";
import { BsChatDots } from "react-icons/bs";

import { AuthContext } from "../../../store/AuthContext";
import { ChangeLanguageDropDown } from "../../common";
import { ChatContext } from "../../../store/ChatContext";
import { ScreenContext } from "../../../store/ScreenContext";
import ChatList from "../ChatList";

const ChatRoom: React.FC = (props) => {
  const {
    mainRoomId,
    setMainRoomId,
    mainChatMessages,
    isViewChatList,
    setIsViewChatList,
    publish,
    setTotalMessage,
    setMainChatMessages,
  } = useContext(ChatContext);
  const { user, grantRefresh, accessToken } = useContext(AuthContext);
  const { windowSize } = useContext(ScreenContext);
  const [message, setMessage] = useState<string>("");
  // const [isViewChatList, setIsViewChatList] = useState(false);
  const [selectLanguage, setSelectLanguage] = useState<string[]>(["Korean"]);
  const chatMessageBox = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const sendMessage = () => {
    if (message === "") return;
    publish(message, "TALK");
    setMessage("");
  };

  const leaveChatRoom: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const response = await axios
      .delete(`/chat/room/${mainRoomId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
          Accept: "application/json",
        },
      })
      .catch((err) => err.response);

    if (response.status === 401) {
      //acessToken 만료
      grantRefresh();
      return;
    }

    if (!response.data.isSuccess) {
      console.error(response.data);
      return;
    }

    setTotalMessage((pre) => {
      const result = pre;
      const resultFilter = result.filter((item) => item.roomId !== mainRoomId);
      return resultFilter;
    });
    setMainChatMessages([]);
    setMainRoomId(-1);
  };

  const backHome: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push("/post");
  };

  const viewChatList: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (windowSize > 1000) return;
    setIsViewChatList((pre) => !pre);
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
    setTimeout(() => {
      scrollToBottom();
    }, 1000);
  }, [mainChatMessages]);

  return (
    <Outline>
      <Inner>
        <Header>
          <MessagesHeaderIcons>
            <MessageHeaderButton onClick={backHome}>
              <RiHome2Line />
            </MessageHeaderButton>
            <MessageHeaderButton onClick={leaveChatRoom}>
              <BsBoxArrowRight />
            </MessageHeaderButton>
            <ChatListViewButtonBox>
              <MessageHeaderButton onClick={viewChatList}>
                <BsChatDots />
              </MessageHeaderButton>
            </ChatListViewButtonBox>
          </MessagesHeaderIcons>
          <ChangeLanguageDropDown
            selectLanguage={selectLanguage}
            setSelectLanguage={setSelectLanguage}
          />
        </Header>
        {/* use Memo 적용할것 */}
        {isViewChatList && windowSize <= 1000 ? (
          <ChatList />
        ) : (
          <>
            <MessageContainer>
              {(() => {
                if (mainRoomId !== -1) {
                  if (mainChatMessages && setMainChatMessages.length > 0) {
                    return (
                      <div ref={chatMessageBox}>
                        {mainChatMessages.map((chatMessage, index) => {
                          // 토크 타입이 아닌 정보는 InfoMessage
                          if (
                            chatMessage.messageType === "ENTER" ||
                            chatMessage.messageType === "EXIT"
                          )
                            return (
                              <InfoMessage key={index}>
                                {chatMessage.message}
                              </InfoMessage>
                            );

                          // 토크 타입인 일반메세지 분류
                          return (
                            <ChatMessage
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
              onChange={(e) => {
                // if (e.key === "Enter") return;
                setMessage(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              value={message}
              onClick={(e) => {
                e.preventDefault();
                sendMessage();
              }}
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
  height: calc(var(--vh, 1vh) * 100 - 150px);
  /* margin-bottom: 50px; */
  width: 100%;
  max-width: 600px;
  @media (max-width: 768px) {
    /* height: calc(100vh - 100px);
    height: calc(var(--vh, 1vh) * 100 - 100px);
    margin-top: 50px;
    margin-bottom: 50px; */
    /* height: calc(100%); */
    position: fixed;
    top: 120px;
    height: calc(100% - 170px);
  }
  @media (max-width: 500px) {
    min-width: 320px;
  }
  padding: 0px 20px;
`;

const Inner = styled.div`
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
  position: relative;
  z-index: 0;
`;

const Header = styled.div`
  align-items: center;
  position: sticky;
  top: 0px;
  width: 100%;
  display: flex;
  border-bottom: ${(props) =>
    props.theme.id === "light"
      ? "1px solid rgb(0, 0, 0, 0.2)"
      : "1px solid rgb(255, 255, 255, 0.2)"};
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  height: 50px;
  z-index: 20;
  @media (max-width: 768px) {
    top: 70px;
    position: fixed;
    left: 0px;
  }
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
const MessagesHeaderIcons = styled.div`
  display: flex;
  margin-right: auto;
`;

const MessageHeaderButton = styled.button`
  border: none;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  color: ${(props) => props.theme.primaryColor};
  font-size: 2rem;
  cursor: pointer;
  width: 44px;
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

const ChatListViewButtonBox = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;
