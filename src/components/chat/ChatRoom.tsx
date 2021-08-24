import { Message, MessageInput } from ".";
import styled from "styled-components";
import DefaultImage from "../../../public/Layout/btsSugar.jpeg";

import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { useController } from "react-hook-form";
import { AuthContext } from "../../store/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";
import { BsBoxArrowRight } from "react-icons/bs";
import { RiHome2Line } from "react-icons/ri";
import PostOrder from "../../pages/post/PostOrder";

interface ChatRoomProps {
  chatMessage: any[];
  yourProfileImage: string;
  roomId: string;
  publish: (message: any, messageType: string) => void;
}

const Outline = styled.div`
  border: none;
  box-sizing: border-box;
  overflow: auto;
  height: calc(100vh - 150px);
  /* margin-bottom: 50px; */
  width: 100%;
  max-width: 460px;
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

const ChatRoom: React.FC<ChatRoomProps> = (props) => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState<string>("");
  const chatMessageBox = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const leaveChatRoom = async () => {
    props.publish("", "EXIT");
    const response = await axios.delete(`/chat/room/${props.roomId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${user?.token}`,
        Accept: "application/json",
      },
    });
    console.log(response.data, "leaveChatRoom");
    if (!response.data.isSuccess) {
      console.error(response.data);
      return;
    }
    router.push("/post");
  };

  const backHome = () => {
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
        </Header>
        {/* use Memo 적용할것 */}
        <MessageContainer>
          {props.chatMessage && props.chatMessage.length > 0 && (
            <div ref={chatMessageBox}>
              {props.chatMessage.map((chatMessage: any, index: any) => {
                if (user.id === chatMessage.senderId) {
                  return (
                    <Message key={index} regDate={chatMessage.regDate}>
                      {chatMessage.message}
                    </Message>
                  );
                } else {
                  return (
                    <Message
                      src={`https://mylifeforcoding.com/users/image?imageUrl=${props.yourProfileImage}`}
                      key={index}
                      regDate={chatMessage.regDate}
                    >
                      {chatMessage.message}
                    </Message>
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

export { ChatRoom };
