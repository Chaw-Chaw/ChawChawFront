import { Layout } from "../../components/common";
import ChatRoom from "../../components/chat/ChatRoom";
import ChatList from "../../components/chat/ChatList";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useRouter } from "next/router";
import {
  CONFIRM_PUSH_LOGINPAGE,
  ERROR_ALERT,
  ERROR_ENTER_AFTERLOGIN_MSG,
  INITIAL_ID,
  INITIAL_ROOMID,
  LOGIN_PAGE_URL,
  ROLE_ADMIN,
} from "../../constants";
import { ChatContext } from "../../store/ChatContext";
import { useChat } from "../../hooks/api/chat/useChat";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { isLogin } from "../../utils";
import { alertActions, asyncErrorHandle } from "../../store/alertSlice";
import { useSelector } from "react-redux";
import {
  chatActions,
  confirmChatRoom,
  makeChatRoom,
  organizeChatMessages,
} from "../../store/chatSlice";
import { RoomType } from "../../types/chat";

export default function Chat() {
  const { mainRoom, totalMessages } = useAppSelector((state) => state.chat);
  const mainRoomId = mainRoom.id;
  const router = useRouter();
  const routerQuery = JSON.stringify(router.query);
  const routerQueryUserId = Number(router.query.userId);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const userRole = user.role;
  const isBlockUser = user.blockIds?.includes(routerQueryUserId);
  const blockedRoomId = totalMessages.find((item) =>
    item.participantIds.includes(routerQueryUserId)
  )?.roomId;

  useEffect(() => {
    if (userRole === ROLE_ADMIN) {
      return;
    }
    if (!isLogin()) {
      dispatch(
        alertActions.updateAlert({
          name: ERROR_ALERT,
          message: ERROR_ENTER_AFTERLOGIN_MSG,
          confirmFuncName: CONFIRM_PUSH_LOGINPAGE,
        })
      );
      return;
    }
    // 채팅 페이지에서 나가면 메인 룸 넘버는 -1
    return () => {
      dispatch(
        chatActions.updateMainRoom({ id: INITIAL_ROOMID, userId: INITIAL_ID })
      );
    };
  }, [dispatch, userRole]);

  // 채팅페이지에서 메인룸 변경시 메인채팅창 내용 수정
  useEffect(() => {
    if (mainRoomId === -1) return;
    dispatch(chatActions.organizeMainChat());
  }, [mainRoomId, dispatch]);

  useEffect(() => {
    // 라우터가 빈 라우터일 경우 무시
    try {
      if (routerQuery === JSON.stringify({})) return;
      const userId = routerQueryUserId || undefined;

      // 라우터 쿼리에 userId가 없으면 무시
      if (userId === undefined) return;

      // 차단한 유저라면
      if (isBlockUser) {
        if (!blockedRoomId) return;
        dispatch(
          chatActions.updateMainRoom({ id: blockedRoomId, userId: userId })
        );
        dispatch(organizeChatMessages());
        return;
      }

      // 채팅룸 입장인경우
      if (userId !== INITIAL_ID) {
        (async () => {
          let mainRoomId = INITIAL_ROOMID;
          const roomId = await dispatch(confirmChatRoom()).unwrap();
          // 채팅방이 없다면 채팅방 만들기
          if (roomId === -1) {
            mainRoomId = await dispatch(makeChatRoom()).unwrap();
          } else {
            mainRoomId = roomId;
          }

          // 채팅방을 만들고 전체 메세지들을 받기
          dispatch(
            chatActions.updateMainRoom({ id: mainRoomId, userId: userId })
          );
          dispatch(organizeChatMessages());
          // 메인룸에 해당하는 알림 메시지 거르기
          dispatch(chatActions.filterNewMessages());
        })();
        return;
      }
      // 채팅 페이지만 입장한 경우
      dispatch(
        chatActions.updateMainRoom({ id: INITIAL_ROOMID, userId: INITIAL_ID })
      );
      dispatch(organizeChatMessages());
    } catch (error) {
      dispatch(asyncErrorHandle(error));
    }
  }, [routerQuery, dispatch, routerQueryUserId, isBlockUser, blockedRoomId]);

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
