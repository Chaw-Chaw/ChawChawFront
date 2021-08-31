import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import styled from "styled-components";
import { ChatMessageProps } from "./ChatMessage";
import { MessageContext } from "./MessageContext";
import { RegDateMessage } from "./YourMessage";

interface MyMessageProps {
  regDate: string;
  context: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const MyMessage: React.FC<MyMessageProps> = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [context, setContext] = useState(props.children);
  const onRightClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsActive((pre) => !pre);
    return;
  };

  return (
    <MyMessageContainer>
      <MyMessageBox onContextMenu={onRightClick}>
        <MessageContext
          isActive={isActive}
          setIsActive={setIsActive}
          type="me"
          onClick={props.onClick}
        />
        <div>{props.context}</div>
      </MyMessageBox>
      <RegDateMessage>{props.regDate}</RegDateMessage>
    </MyMessageContainer>
  );
};

export { MyMessage };
export type { MyMessageProps };
const MyMessageBox = styled.div`
  position: relative;
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
`;

const MyMessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
`;
