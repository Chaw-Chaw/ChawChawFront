import styled from "styled-components";
import { MessageImage } from "./MessageImage";

interface MessageProps {
  src?: string;
  userName?: string;
  regDate: string;
}

const ChatMessage: React.FC<MessageProps> = (props) => {
  const regDate = props.regDate.split("T").join(" ");
  return (
    <>
      {props.src ? (
        <>
          <MessageContainer>
            <MessageImage src={props.src} />
            <YourMessageContainer>
              <MessageUserName>{props.userName}</MessageUserName>
              <YourMessageBox>{props.children}</YourMessageBox>
            </YourMessageContainer>
          </MessageContainer>
          <RegDateMessage>{regDate}</RegDateMessage>
        </>
      ) : (
        <>
          <MessageContainer>
            <MyMessageContainer>
              <MyMessageBox>{props.children}</MyMessageBox>
              <RegDateMessageMe>{regDate}</RegDateMessageMe>
            </MyMessageContainer>
          </MessageContainer>
        </>
      )}
    </>
  );
};

export default ChatMessage;

const YourMessageBox = styled.div`
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  max-width: 300px;
  min-width: 70px;
  min-height: 50px;
  border: 1px solid ${(props) => props.theme.primaryColor};
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  border-radius: 20px;
  border-top-left-radius: 0px;
`;

const MyMessageBox = styled.div`
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  max-width: 300px;
  min-width: 70px;
  min-height: 50px;
  /* border: 1px solid ${(props) => props.theme.primaryColor}; */
  background-color: ${(props) => props.theme.primaryColor};
  border-radius: 20px;
  border-top-right-radius: 0px;
  color: white;
  margin-left: auto;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
`;

const MessageUserName = styled.h2`
  font-size: 1rem;
  margin: 0px;
  margin-bottom: 2px;
  color: rgb(126, 126, 126);
`;
const YourMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
`;
const RegDateMessage = styled.div`
  font-size: 0.5rem;
  color: ${(props) => props.theme.secondaryColor};
  margin-top: 4px;
`;
const RegDateMessageMe = styled(RegDateMessage)`
  margin-left: auto;
`;
const MyMessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
