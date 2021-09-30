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
import { useCookies } from "react-cookie";

export default function Chat() {
  const { grantRefresh, isLogin } = useContext(AuthContext);
  const { windowSize } = useContext(ScreenContext);
  const [cookies] = useCookies(["accessToken"]);
  const {
    mainRoomId,
    setMainRoomId,
    setMainChatMessages,
    totalMessage,
    setTotalMessage,
  } = useContext(ChatContext);
  const router = useRouter();
  const message = useAlert();

  const getMainRoomId = async (userId: number) => {
    const response = await axios
      .post(
        "/chat/room",
        { userId: userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.accessToken,
            Accept: "application/json",
          },
        }
      )
      .catch((err) => err.response);

    if (response.data.responseMessage === "차단한 또는 차단된 유저") {
      message.error("유저로 부터 차단되어 채팅방을 들어갈 수 업습니다.", {
        onClose: () => {
          router.back();
        },
      });
    }

    if (!response.data.isSuccess) {
      console.error(response.data);
      return;
    }
    console.log(response, "getMainRoomId");
    const mainRoomId = response.data.data.roomId;
    setMainRoomId(mainRoomId);
    // 채팅방을 만들고 전체 메세지들을 받기
    getMessageLog();
  };

  const getMessageLog = async () => {
    const response = await axios
      .get(BACKEND_URL + "/chat/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.accessToken,
          Accept: "application/json",
        },
      })
      .catch((err) => err.response);

    console.log(response, "getMessageLog");
    dataProcess(response, -1);
  };

  const dataProcess = (res: AxiosResponse, userId: number) => {
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

    // 토탈 메세지 저장
    setTotalMessage(res.data.data);
    setMainChat(res.data.data);
  };

  const setMainChat = (totalMessage: RoomType[]) => {
    const mainChatLog = totalMessage.find((item) => item.roomId === mainRoomId);
    if (!mainChatLog) return;

    // 메인 채팅메세지 set
    setMainChatMessages([...mainChatLog.messages]);
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
    () => setMainRoomId(-1);
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
      getMainRoomId(userId);
    } else {
      // 채팅 페이지만 입장한 경우
      getMessageLog();
      setMainRoomId(-1);
      setMainChatMessages([]);
    }
  }, [JSON.stringify(router.query)]);

  // 채팅페이지에서 메인룸 변경
  useEffect(() => {
    setMainChat(totalMessage);
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
  justify-content: center;
`;
