import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { MESSAGE_TYPE_YOURS, MESSAGE_TYPE_MINE } from "../../../constants";

interface MessageContextProps {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  type: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const MMessageContext: React.FC<MessageContextProps> = (props) => {
  return (
    <MessageContextSelect
      onClick={props.onClick}
      type={props.type}
      isActive={props.isActive}
    >
      <span>번역</span>
    </MessageContextSelect>
  );
};
const MessageContext = React.memo(MMessageContext);
export { MessageContext };

const MessageContextSelect = styled.div<{ isActive: boolean; type: string }>`
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: ${(props) =>
    props.type === MESSAGE_TYPE_YOURS ? "-70px" : "initial"};
  left: ${(props) => (props.type === MESSAGE_TYPE_MINE ? "-70px" : "initial")};
  display: ${(props) => (props.isActive ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  width: 60px;
  height: 25px;
  border: 1px solid ${(props) => props.theme.primaryColor};
  &:hover {
    background-color: ${(props) => props.theme.primaryColor};
    color: white;
  }
  color: ${(props) => (props.theme.id === "light" ? "black" : "white")};
`;
