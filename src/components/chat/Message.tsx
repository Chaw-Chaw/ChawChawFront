import styled from "styled-components";
import { ProfileImage } from "./ProfileImage";

interface MessageProps {
  src?: StaticImageData;
  userName?: string;
}
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

const MyMessageBox = styled(YourMessageBox)`
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

const Message: React.FC<MessageProps> = (props) => {
  return (
    <>
      {props.src ? (
        <MessageContainer>
          <ProfileImage src={props.src} />
          <YourMessageContainer>
            <MessageUserName>{props.userName}</MessageUserName>
            <YourMessageBox>{props.children}</YourMessageBox>
          </YourMessageContainer>
        </MessageContainer>
      ) : (
        <MessageContainer>
          <MyMessageBox>{props.children}</MyMessageBox>
        </MessageContainer>
      )}
    </>
  );
};

export { Message };
