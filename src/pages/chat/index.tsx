import { Layout } from "../../components/common";
import ChatRoom from "../../components/chat/ChatRoom";
import ChatList from "../../components/chat/ChatList";
import styled from "styled-components";
import { useEffect } from "react";
import {
  CONFIRM_PUSH_LOGINPAGE,
  ERROR_ALERT,
  ERROR_ENTER_AFTERLOGIN_MSG,
  INITIAL_ID,
  INITIAL_ROOMID,
  ROLE_ADMIN,
  USER_ROLE,
} from "../../constants";
import { useAppDispatch } from "../../hooks/redux";
import { alertActions } from "../../store/alertSlice";
import { userRole } from "../../utils";

export default function Chat() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userRole() !== USER_ROLE) {
      dispatch(
        alertActions.updateAlert({
          name: ERROR_ALERT,
          message: ERROR_ENTER_AFTERLOGIN_MSG,
          confirmFuncName: CONFIRM_PUSH_LOGINPAGE,
        })
      );
    }

    // 채팅 페이지에서 나가면 메인 룸 넘버는 -1
  }, [dispatch]);

  // 채팅페이지에서 메인룸 변경시 메인채팅창 내용 수정

  return (
    <Layout>
      <Container>
        <ChatRoom />
        <ChatListWrapper>
          <ChatList />
        </ChatListWrapper>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ChatListWrapper = styled.div`
  display: flex;
  width: 400px;
  @media (max-width: 1024px) {
    display: none;
  }
`;
