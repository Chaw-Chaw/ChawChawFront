import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import styled from "styled-components";
import { MessageContext } from "./MessageContext";
import { ChatMessageProps } from "./ChatMessage";
import { MessageImage } from "./MessageImage";
import { DEFAULT_PROFILE_IMAGE } from "../../../constants";
import { MyMessageProps } from "./MyMessage";

interface YourMessageProps extends MyMessageProps {
  src: string;
  userName?: string;
}

const YourMessage: React.FC<YourMessageProps> = (props) => {
  const [isActive, setIsActive] = useState(false);
  const onRightClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsActive((pre) => !pre);
    return;
  };

  return (
    <YourMessageContainer>
      <YourMessageInfo>
        <MessageImage src={props.src || DEFAULT_PROFILE_IMAGE} />
        {/* <MessageUserName>{props.userName}</MessageUserName> */}
        <YourMessageBox onContextMenu={onRightClick}>
          <MessageContext
            isActive={isActive}
            setIsActive={setIsActive}
            type="you"
            onClick={props.onClick}
          />
          {props.context}
        </YourMessageBox>
      </YourMessageInfo>
      <RegDateMessage>{props.regDate}</RegDateMessage>
    </YourMessageContainer>
  );
};

export { YourMessage, RegDateMessage };

const YourMessageInfo = styled.div`
  display: flex;
`;

const YourMessageBox = styled.div`
  position: relative;
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
`;

const RegDateMessage = styled.div`
  font-size: 0.5rem;
  color: ${(props) => props.theme.secondaryColor};
  margin-top: 4px;
`;
