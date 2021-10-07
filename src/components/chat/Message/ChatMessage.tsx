import styled from "styled-components";
import { MyMessage } from "./MyMessage";
import { YourMessage } from "./YourMessage";

interface ChatMessageProps {
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

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
  const regDate = props.regDate.split("T").join(" ");

  return (
    <MessageContainer>
      {props.src ? (
        <YourMessage
          regDate={regDate}
          src={props.src}
          userName={props.userName}
          context={props.context}
          selectLanguage={props.selectLanguage}
          imageUrl={props.imageUrl}
          userId={props.userId}
          messageType={props.messageType}
          scrollToBottom={props.scrollToBottom}
        />
      ) : (
        <MyMessage
          context={props.context}
          regDate={regDate}
          selectLanguage={props.selectLanguage}
          imageUrl={props.imageUrl}
          messageType={props.messageType}
          scrollToBottom={props.scrollToBottom}
        />
      )}
    </MessageContainer>
  );
};

export default ChatMessage;
export type { ChatMessageProps };

const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 10px;
`;
