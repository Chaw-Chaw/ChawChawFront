import React, { ReactNode } from "react";
import styled from "styled-components";
import { Button } from "./";

interface MessageProps {
  onClick?: () => void;
  message?: ReactNode;
  style?: React.CSSProperties;
  type?: string;
}
const MessageContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;
const MessageBox = styled.div`
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  width: 500px;
  height: 200px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  font-weight: 700;
  @media (max-width: 500px) {
    width: 200px;
  }
`;

const MessageTitleBox = styled.div`
  position: absolute;
  top: 0;
  background-color: ${(props) => props.theme.primaryColor};
  width: 100%;
  height: 40px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  align-items: center;
  span {
    color: ${(props) => props.theme.bodyBackgroundColor};
    font-size: 1.3rem;
    font-weight: 900;
  }
  padding: 0px 20px;
  box-sizing: border-box;
`;

const MessageConfirmButton = styled(Button)`
  border-radius: 10px;
  position: absolute;
  bottom: 40px;
`;

const Message: React.FC<MessageProps> = (props) => {
  return (
    <MessageContainer>
      <MessageBox style={props.style}>
        <MessageTitleBox>
          <span>{props.type}</span>
        </MessageTitleBox>
        {props.message}
        <MessageConfirmButton onClick={props.onClick}>
          확인
        </MessageConfirmButton>
      </MessageBox>
    </MessageContainer>
  );
};

export { Message, MessageConfirmButton, MessageBox };
