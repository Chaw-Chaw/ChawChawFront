import styled from "styled-components";
import { ProfileImage } from "./ProfileImage";

interface MessageProps {
  src?: StaticImageData;
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
  margin-left: 10px;
`;

const MyMessageBox = styled(YourMessageBox)`
  background-color: ${(props) => props.theme.primaryColor};
  border-radius: 20px;
  border-top-right-radius: 0px;
  color: white;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px;
`;
const Message: React.FC<MessageProps> = (props) => {
  return (
    <>
      {props.src ? (
        <MessageContainer>
          <ProfileImage src={props.src} />
          <YourMessageBox>{props.children}</YourMessageBox>
        </MessageContainer>
      ) : (
        <MessageContainer>
          <MyMessageBox>{props.children}</MyMessageBox>
        </MessageContainer>
      )}
    </>
  );
};

export { YourMessageBox, MyMessageBox, Message };
