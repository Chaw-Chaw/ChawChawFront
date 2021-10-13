import { Layout } from "../../components/common";
import ChatRoom from "../../components/chat/ChatRoom";
import ChatList from "../../components/chat/ChatList";
import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import { INITIAL_ID, INITIAL_ROOMID } from "../../constants";
import { ChatContext } from "../../store/ChatContext";
import { getSecureLocalStorage } from "../../utils";

export default function Chat() {
  const { grantRefresh, isLogin, user } = useContext(AuthContext);
  const {
    mainRoom,
    setMainRoom,
    totalMessage,
    setNewMessages,
    organizeChatMessages,
    organizeMainChat,
  } = useContext(ChatContext);
  const router = useRouter();
  const message = useAlert();

  const makeChatRoom = async (userId: number) => {
    const response = await axios
      .post(
        "/chat/room",
        { userId: userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: getSecureLocalStorage("accessToken"),
            Accept: "application/json",
          },
        }
      )
      .catch((err) => err.response);

    if (response.status === 401) {
      grantRefresh();
    }

    if (response.data.responseMessage === "차단한 또는 차단된 유저") {
      message.error(
        "상대방을 차단 했거나 차단되어 채팅방을 생성할 수 없습니다.",
        {
          onClose: () => {
            router.back();
          },
        }
      );
    }

    if (!response.data.isSuccess) {
      console.error(response.data);
      return;
    }
    console.log(response, "makeChatRoom");
    return response.data.data.roomId;
  };

  useEffect(() => {
    if (!isLogin) {
      message.error("로그인 후에 서비스를 이용해주세요.", {
        onClose: () => {
          router.push("/account/login");
        },
      });
    }
    // 채팅 페이지에서 나가면 메인 룸 넘버는 -1
    setMainRoom({ id: INITIAL_ROOMID, userId: INITIAL_ID });
  }, []);

  // 채팅페이지에서 메인룸 변경시 메인채팅창 내용 수정
  useEffect(() => {
    organizeMainChat(totalMessage, mainRoom.id);
  }, [JSON.stringify(mainRoom.id)]);

  useEffect(() => {
    // 라우터가 빈 라우터일 경우 무시
    if (JSON.stringify(router.query) === JSON.stringify({})) return;
    const userId = router.query.userId
      ? Number(router.query.userId)
      : undefined;

    // 라우터 쿼리에 userId가 없으면 무시
    if (userId === undefined) return;

    // 차단한 유저라면
    if (user.blockIds?.includes(userId)) {
      const blockedRoom = totalMessage.find((item) =>
        item.participantIds.includes(userId)
      );
      if (!blockedRoom) return;
      setMainRoom({ id: blockedRoom.roomId, userId: userId });
      organizeChatMessages(blockedRoom.roomId);
      return;
    }

    if (userId !== INITIAL_ID) {
      (async () => {
        // 채팅룸 입장인경우
        const mainRoomId = await makeChatRoom(userId);
        // 채팅방을 만들고 전체 메세지들을 받기
        setMainRoom({ id: mainRoomId, userId: userId });
        organizeChatMessages(mainRoomId);

        // 메인룸에 해당하는 알림 메시지 거르기
        setNewMessages((pre) => {
          const result = pre;
          const filteredNewMessages = result.filter((item: any) => {
            if (item.roomId === undefined) return true;
            if (item.roomId !== mainRoomId) return true;
            return false;
          });
          return filteredNewMessages;
        });
      })();
    }

    // 채팅 페이지만 입장한 경우
    setMainRoom({ id: INITIAL_ROOMID, userId: INITIAL_ID });
    organizeChatMessages(INITIAL_ROOMID);
  }, [JSON.stringify(router.query)]);

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
  display: initial;
  width: 400px;
  @media (max-width: 1024px) {
    display: none;
  }
`;
