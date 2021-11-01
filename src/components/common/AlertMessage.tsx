import { ReactNode } from "react";
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
        <AlertMessageContent>{props.message}</AlertMessageContent>
        <AlertMessageButtonBox>
          {props.children}
          <AlertMessageConfirmButton onClick={props.onClick}>
            확인
          </AlertMessageConfirmButton>
        </AlertMessageButtonBox>
      </AlertMessageBox>
    </AlertMessageContainer>
  );
};

export { AlertMessage };

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
  min-height: 200px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  box-sizing: border-box;
  word-wrap: break-word;
  @media (max-width: 500px) {
    width: 200px;
  }
  @keyframes slide-in-bottom {
    0% {
      -webkit-transform: translateY(1000px);
      transform: translateY(1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }

  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

const AlertMessageTitleBox = styled.div`
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

const AlertMessageButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const AlertMessageConfirmButton = styled(Button)`
  border-radius: 10px;
`;

const AlertMessageContent = styled.span`
  margin: 0px 20px;
  word-break: break-word;
`;
