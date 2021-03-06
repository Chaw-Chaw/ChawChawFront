import React, { MouseEvent } from "react";
import styled from "styled-components";
import { Button } from ".";
import { SELECT_TYPE } from "../../constants/alert";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { alertActions, confirmFunc } from "../../store/alertSlice";

const MAlertMessage: React.FC = () => {
  const dispatch = useAppDispatch();
  const alertList = useAppSelector((state) => state.alert.alertList);
  const handleClickConfirm = (
    e: MouseEvent<HTMLButtonElement>,
    id: number,
    confirmFuncName: string
  ) => {
    e.preventDefault();
    // 여기서 함수를 받아서 실행을 시켜야 하는데...
    // 아니면 확인창 컴포넌트를 따로빼서 함수를 전달해서 실행시키거나..
    dispatch(confirmFunc(confirmFuncName));
    dispatch(alertActions.removeAlert(id));
  };
  const handleClickCancle = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    dispatch(alertActions.removeAlert(id));
  };

  return (
    <AlertMessageContainer>
      <AlertMessageInner>
        {alertList.map((item) => (
          <AlertMessageBox key={item.id}>
            <AlertMessageTitleBox>
              <span>{item.name}</span>
            </AlertMessageTitleBox>
            <AlertMessageContent>{item.message}</AlertMessageContent>
            <AlertMessageButtonBox>
              <AlertMessageConfirmButton
                onClick={(e) =>
                  handleClickConfirm(e, item.id, item.confirmFuncName)
                }
              >
                확인
              </AlertMessageConfirmButton>
              {item.type === SELECT_TYPE && (
                <AlertMessageCancelButton
                  onClick={(e) => handleClickCancle(e, item.id)}
                >
                  취소
                </AlertMessageCancelButton>
              )}
            </AlertMessageButtonBox>
          </AlertMessageBox>
        ))}
      </AlertMessageInner>
    </AlertMessageContainer>
  );
};

const AlertMessage = React.memo(MAlertMessage);
export { AlertMessage };

const AlertMessageContainer = styled.div`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
`;
const AlertMessageBox = styled.div`
  position: absolute;
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
const AlertMessageCancelButton = styled(AlertMessageConfirmButton)`
  margin-left: 20px;
`;

const AlertMessageContent = styled.span`
  margin: 0px 20px;
  word-break: break-word;
`;

const AlertMessageInner = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
