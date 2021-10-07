import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { DEFAULT_PROFILE_IMAGE, LIMIT_NEWALARM_SIZE } from "../../constants";
import { ChatContext } from "../../store/ChatContext";
import { MessageImage } from "../chat/Message/MessageImage";
import { AlarmCount } from "./AlarmCount";

interface ChatBoxProps {
  imageUrl: string;
  regDate: string;
  sender: string;
  roomId?: number;
  onClick: () => void;
  context: string;
  chatList?: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = (props) => {
  const { mainRoom, newMessages } = useContext(ChatContext);
  const mainChatList = useRef<HTMLDivElement>(null);
  const regDate = props.regDate.split("T").join(" ");
  const isCurrentChat = props.roomId === mainRoom.id;
  const matchNewMessages = newMessages.filter((item: any) => {
    if (item.roomId === props.roomId) return true;
    return false;
  });

  useEffect(() => {
    if (!mainChatList.current) return;
    mainChatList.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, [JSON.stringify(mainRoom.id)]);

  return (
    <ChatContainer
      ref={isCurrentChat ? mainChatList : null}
      isCurrentChat={isCurrentChat}
      onClick={(e) => {
        e.preventDefault();
        if (isCurrentChat) return;
        props.onClick();
      }}
    >
      <MessageImage
        src={props.imageUrl ? `${props.imageUrl}` : DEFAULT_PROFILE_IMAGE}
      >
        {!props.chatList && matchNewMessages.length !== 0 && (
          <AlarmCount>
            <span>
              {matchNewMessages.length > LIMIT_NEWALARM_SIZE
                ? LIMIT_NEWALARM_SIZE
                : matchNewMessages.length}
            </span>
          </AlarmCount>
        )}
      </MessageImage>
      <ChatMessageBox isCurrentChat={isCurrentChat}>
        <ChatUserName isCurrentChat={isCurrentChat}>
          {props.sender}
        </ChatUserName>
        {props.context.length > 20
          ? props.context.substring(0, 15) + "..."
          : props.context}
        <RegDateMessage>{regDate}</RegDateMessage>
      </ChatMessageBox>
    </ChatContainer>
  );
};

export { ChatBox };
const ChatContainer = styled.div<{ isCurrentChat: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  background-color: ${(props) =>
    props.isCurrentChat
      ? props.theme.primaryColor
      : props.theme.bodyBackgroundColor};
  border: 1px solid ${(props) => props.theme.primaryColor};
  border-radius: 20px;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 10px;
`;

const ChatUserName = styled.h2<{ isCurrentChat: boolean }>`
  font-family: "BMJUA";
  font-size: 1.3rem;
  margin: 0px;
  margin-bottom: 5px;
  color: ${(props) => (props.isCurrentChat ? "white" : props.theme.colors)};
  /* color: rgb(126, 126, 126); */
`;

const ChatMessageBox = styled.div<{ isCurrentChat: boolean }>`
  color: ${(props) => (props.isCurrentChat ? "white" : props.theme.colors)};
  width: 80%;
  display: flex;
  flex-direction: column;
  font-family: "Source Sans Pro";
`;

const RegDateMessage = styled.div`
  font-size: 0.5rem;
  color: ${(props) => props.theme.secondaryColor};
  margin-top: 4px;
  margin-left: auto;
  font-family: "BMJUA";
`;
