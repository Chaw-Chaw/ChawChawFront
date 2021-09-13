import { Layout } from "../../components/common";
import ChatRoom from "../../components/chat/ChatRoom";
import ChatList from "../../components/chat/ChatList";
import styled from "styled-components";
import axios, { AxiosResponse } from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import { BACKEND_URL } from "../../constants";
import { ChatContext, RoomType } from "../../store/ChatContext";
import { ScreenContext } from "../../store/ScreenContext";

export default function Chat() {
  const { grantRefresh, accessToken } = useContext(AuthContext);
  const { windowSize } = useContext(ScreenContext);
  const {
    mainRoomId,
    setMainRoomId,
    setMainChatMessages,
    totalMessage,
    setTotalMessage,
    publishEnterChat,
  } = useContext(ChatContext);
  const router = useRouter();
  const message = useAlert();

  const getUserMessageLog = async (userId: number) => {
    const response = await axios
      .post(
        "/chat/room",
        { userId: userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
            Accept: "application/json",
          },
        }
      )
      .catch((err) => err.response);
    console.log(response, "getUserMessageLog");
    dataProcess(response, userId);
  };

  const getMessageLog = async () => {
    const response = await axios
      .get(BACKEND_URL + "/chat/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
          Accept: "application/json",
        },
      })
      .catch((err) => err.response);

    console.log(response, "getMessageLog");
    dataProcess(response, -1);
  };

  const dataProcess = (res: AxiosResponse, userId: number) => {
    // console.log(res.status, "statuscode");
    if (res.status === 403) {
      message.error("프로필을 작성해주세요.", {
        onClose: () => {
          router.push("/account/profile");
        },
      });
    }
    if (res.status === 401) {
      // access token 만료
      // refresh token 전송
      grantRefresh();
      return;
    }
    if (!res.data.isSuccess) {
      console.log(res.data, "chatError");
      console.error(res.data);
      return;
    }

    const tmpTotalMessage: RoomType[] = res.data.data;

    // 메인 채팅방 입장시
    if (userId !== -1) {
      const mainMessageLog = tmpTotalMessage.find(
        (item) => item.senderId === userId
      );
      // 메인 룸 아이디는 메인 메시지가 있다면 메인메세지 룸 id 아니면 -1
      const tmpMainRoomId = mainMessageLog ? mainMessageLog.roomId : -1;
      // 메인 메세지가 있다면 메인메세지 세팅
      if (mainMessageLog) {
        setMainChatMessages(mainMessageLog.messages);
      }
      setMainRoomId(tmpMainRoomId);
    }
    // 토탈 메세지 저장
    setTotalMessage(res.data.data);
  };

  useEffect(() => {
    if (!accessToken) {
      message.error("로그인 후에 서비스를 이용해주세요.", {
        onClose: () => {
          router.push("/account/login");
        },
      });
    }
  }, []);

  useEffect(() => {
    // 라우터가 빈 라우터일 경우 무시
    if (JSON.stringify(router.query) === JSON.stringify({})) return;
    const userId = router.query.userId
      ? Number(router.query.userId)
      : undefined;

    // 라우터 쿼리에 userId가 없으면 무시
    if (userId === undefined) return;

    if (userId !== -1) {
      // 채팅룸 입장인경우
      getUserMessageLog(userId);
      publishEnterChat();
    } else {
      // 채팅 페이지만 입장한 경우
      getMessageLog();
      setMainChatMessages([]);
    }
  }, [JSON.stringify(router.query)]);

  // 메인룸 변경
  useEffect(() => {
    console.log(mainRoomId, "메인 룸 변경");
    const mainChatLog = totalMessage.find((item) => item.roomId === mainRoomId);
    if (!mainChatLog) return;
    publishEnterChat();
    setMainChatMessages([...mainChatLog.messages]);
  }, [mainRoomId]);

  return (
    <Layout>
      <Container>
        <ChatRoom />
        {windowSize > 1000 ? <ChatList /> : null}
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  /* max-width: 500px;
  @media (max-width: 500px) {
    max-width: 320px;
  } */
  justify-content: center;
`;
