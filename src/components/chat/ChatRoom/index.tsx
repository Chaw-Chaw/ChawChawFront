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
import { MessageInput } from "./MessageInput";
import ChatMessage from "../Message/ChatMessage";
import InfoMessage from "../Message/InfoMessage";
import { BsBoxArrowRight } from "react-icons/bs";
import { RiHome2Line } from "react-icons/ri";
import { BsChatDots } from "react-icons/bs";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../../store/AuthContext";

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
  const accessToken = cookies.accessToken;
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
      // router.push({ pathname: "/chat", query: { userId: -1 } });
      return;
    }
    props.setMainRoomId(-1);

    // props.disconnect();
    // router.push({ pathname: "/chat", query: { userId: -1 } });
  };

  const backHome = () => {
    props.disconnect();
    router.push("/post");
  };

  const scrollToBottom = () => {
    if (!chatMessageBox.current) return;
    chatMessageBox.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.chatMessage]);

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
          onChange={(e) => {
            // if (e.key === "Enter") return;
            e.preventDefault();
            setMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              props.publish(message, "TALK");
              setMessage("");
            }
          }}
          value={message}
          onClick={() => {
            props.publish(message, "TALK");
            setMessage("");
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
  /* padding: 20px; */
  height: 100%;
`;

const Header = styled.div`
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
  overflow: auto;
`;
const MessageHeaderButton = styled.button`
  border: none;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  color: ${(props) => props.theme.primaryColor};
  font-size: 2rem;
  cursor: pointer;
`;
