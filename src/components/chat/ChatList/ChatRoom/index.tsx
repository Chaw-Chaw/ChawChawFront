import styled from "styled-components";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import MessageInput from "./MessageInput";
import ChatMessage from "../../Message/ChatMessage";
import InfoMessage from "../../Message/InfoMessage";
import { BsBoxArrowRight } from "react-icons/bs";
import { RiHome2Line } from "react-icons/ri";
import { BsChatDots } from "react-icons/bs";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../../../store/AuthContext";
import { ChangeLanguageDropDown } from "../../../common";
import translate from "google-translate-api";

interface ChatRoomProps {
  chatMessage: any[];
  yourProfileImage: string;
  roomId: number;
  publish: (message: any, messageType: string) => void;
  disconnect: () => void;
  setMainRoomId: Dispatch<SetStateAction<number>>;
}

const ChatRoom: React.FC<ChatRoomProps> = (props) => {
  const { user, grantRefresh } = useContext(AuthContext);
  const [cookies] = useCookies(["accessToken"]);
  const [message, setMessage] = useState<string>("");
  const chatMessageBox = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [selectLanguage, setSelectLanguage] = useState<string[]>(["Korean"]);
  const accessToken = cookies.accessToken;

  const sendMessage = () => {
    if (message === "") return;
    props.publish(message, "TALK");
    setMessage("");
  };

  const leaveChatRoom = async () => {
    const response = await axios
      .delete(`/chat/room/${props.roomId}`, {
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
    props.setMainRoomId(-1);
  };

  const backHome = () => {
    props.disconnect();
    router.push("/post");
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
  }, [props.chatMessage]);

  useEffect(() => {
    console.log(selectLanguage[0], "change lang");
  }, [JSON.stringify(selectLanguage)]);

  return (
    <Outline>
      <Inner>
        <Header>
          <MessageHeaderButton onClick={backHome}>
            <RiHome2Line />
          </MessageHeaderButton>
          <MessageHeaderButton onClick={leaveChatRoom}>
            <BsBoxArrowRight />
          </MessageHeaderButton>
          <MessageHeaderButton>
            <BsChatDots />
          </MessageHeaderButton>
          <ChangeLanguageDropDown
            selectLanguage={selectLanguage}
            setSelectLanguage={setSelectLanguage}
          />
        </Header>
        {/* use Memo 적용할것 */}
        <MessageContainer>
          {props.chatMessage && props.chatMessage.length > 0 && (
            <div ref={chatMessageBox}>
              {props.chatMessage.map((chatMessage: any, index: any) => {
                // 토크 타입이 아닌 정보는 InfoMessage
                if (chatMessage.messageType !== "TALK")
                  return <InfoMessage>{chatMessage.message}</InfoMessage>;
                // 토크 타입인 일반메세지 분류
                if (user.id === chatMessage.senderId) {
                  return (
                    <ChatMessage key={index} regDate={chatMessage.regDate}>
                      {chatMessage.message}
                    </ChatMessage>
                  );
                } else {
                  return (
                    <ChatMessage
                      src={`${props.yourProfileImage}`}
                      key={index}
                      regDate={chatMessage.regDate}
                    >
                      {chatMessage.message}
                    </ChatMessage>
                  );
                }
              })}
            </div>
          )}
        </MessageContainer>
        <MessageInput
          roomId={props.roomId}
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
  gap: 0px 10px;
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
  overflow: auto;
`;
const MessageHeaderButton = styled.button`
  border: none;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  color: ${(props) => props.theme.primaryColor};
  font-size: 2rem;
  cursor: pointer;
`;
