import styled from "styled-components";
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
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
import { RiHome2Line } from "react-icons/ri";
import { BsChatDots } from "react-icons/bs";
import { AuthContext } from "../../../store/AuthContext";
import { ChangeLanguageDropDown } from "../../common";
import { ChatContext } from "../../../store/ChatContext";
import { ScreenContext } from "../../../store/ScreenContext";
import ChatList from "../ChatList";

interface ChatRoomProps {
  publish: (message: string, messageType: string) => void;
  disconnect: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = (props) => {
  const { mainRoomId, setMainRoomId, mainChatMessages } =
    useContext(ChatContext);
  const { user, grantRefresh, accessToken } = useContext(AuthContext);
  const { windowSize } = useContext(ScreenContext);
  const [message, setMessage] = useState<string>("");
  const [isViewChatList, setIsViewChatList] = useState(false);
  const [selectLanguage, setSelectLanguage] = useState<string[]>(["Korean"]);
  const chatMessageBox = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const sendMessage = () => {
    if (message === "") return;
    props.publish(message, "TALK");
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

    console.log(response.data, "leaveChatRoom");

    if (response.status === 401) {
      //acessToken 만료
      grantRefresh();
      return;
    }

    if (!response.data.isSuccess) {
      console.error(response.data);
      return;
    }
    setMainRoomId(-1);
  };

  const backHome: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    props.disconnect();
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
    console.log("되야하지 않나");

    setTimeout(() => {
      scrollToBottom();
    }, 1000);
  }, [mainChatMessages]);

  useEffect(() => {
    console.log(selectLanguage[0], "change lang");
  }, [JSON.stringify(selectLanguage)]);

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
            <MessageHeaderButton onClick={viewChatList}>
              <BsChatDots />
            </MessageHeaderButton>
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
              {mainRoomId !== -1 &&
                mainChatMessages &&
                mainChatMessages.length > 0 && (
                  <div ref={chatMessageBox}>
                    {mainChatMessages.map((chatMessage, index) => {
                      // 토크 타입이 아닌 정보는 InfoMessage
                      if (
                        chatMessage.messageType === "ENTER" ||
                        chatMessage.messageType === "EXIT"
                      )
                        return <InfoMessage>{chatMessage.message}</InfoMessage>;

                      // 토크 타입인 일반메세지 분류
                      return (
                        <ChatMessage
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
                          key={index}
                          regDate={chatMessage.regDate}
                          context={chatMessage.message}
                          selectLanguage={selectLanguage}
                        />
                      );
                    })}
                  </div>
                )}
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
              publish={props.publish}
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
  overflow: auto;
  height: calc(100vh - 150px);
  /* margin-bottom: 50px; */
  width: 100%;
  max-width: 600px;
  @media (max-width: 768px) {
    height: calc(100vh - 70px);
  }
  @media (max-width: 500px) {
    min-width: 320px;
  }
  padding: 20px 20px 20px 20px;
`;

const Inner = styled.div`
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
`;

const Header = styled.div`
  align-items: center;
  position: sticky;
  top: 0px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.secondaryColor};
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  height: 50px;
  z-index: 50;
`;
const MessageContainer = styled.div`
  height: calc(100% - 102px);
  width: 100%;
  box-sizing: border-box;
  padding-right: 20px;
  padding-bottom: 10px;
  overflow: auto;
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
`;
