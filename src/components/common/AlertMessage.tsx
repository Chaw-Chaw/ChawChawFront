import React, { ReactNode } from "react";
import styled from "styled-components";
import { Button } from ".";

interface AlertMessageProps {
  onClick?: () => void;
  message?: ReactNode;
  type?: string;
}

const AlertMessage: React.FC<AlertMessageProps> = (props) => {
  return (
    <AlertMessageContainer>
      <AlertMessageBox>
        <AlertMessageTitleBox>
          <span>{props.type}</span>
        </AlertMessageTitleBox>
        {props.message}
        <AlertMessageConfirmButton onClick={props.onClick}>
          확인
        </AlertMessageConfirmButton>
      </AlertMessageBox>
    </AlertMessageContainer>
  );
};

export { AlertMessage, AlertMessageConfirmButton, AlertMessageBox };

const AlertMessageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  pointer-events: all;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AlertMessageBox = styled.div`
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

const AlertMessageTitleBox = styled.div`
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

const AlertMessageConfirmButton = styled(Button)`
  border-radius: 10px;
  position: absolute;
  bottom: 40px;
`;
