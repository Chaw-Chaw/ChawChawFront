import { Layout } from "../../components/common";
import {
  Message,
  MessageInput,
  ChatRoom,
  ChatRoomList,
} from "../../components/chat";
import styled from "styled-components";
import DefaultImage from "../../../public/Layout/btsSugar.jpeg";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  width: 100%;
  /* max-width: 500px;
  @media (max-width: 500px) {
    max-width: 320px;
  } */
  justify-content: center;
`;

export default function Chat() {
  const { user } = useContext(AuthContext);
  const [chatMessages, setChatMessages] = useState<any>([]);
  const [chatListInfo, setChatListInfo] = useState<any>([]);
  const [mainRoomId, setMainRoomId] = useState(-1);
  const [yourProfileImage, setYourProfileImage] = useState("default.png");
  const router = useRouter();
  const getUserMessageLog = async (userId: number) => {
    const response = await axios
      .post(
        "/chat/room",
        { userId: userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${user?.token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (!res.data.isSuccess) {
          throw new Error(res.data);
        }
        console.log(res.data, "getUserMessageLog");
        const messageLog = res.data.data;
        const mainMessageLog = messageLog.find(
          (item: any) => item.senderId === userId
        );
        console.log(mainMessageLog, "MainmessageLog");

        if (mainMessageLog) {
          setChatMessages((chatMessage: any) => [
            ...chatMessage,
            ...mainMessageLog.messages.reverse(),
          ]);
        }
        // 채팅리스트 중복 생성 제거
        console.log(messageLog, "MessageLog");
        setChatListInfo([...messageLog]);
        const roomId = mainMessageLog.roomId;
        setMainRoomId(roomId);
        setYourProfileImage(mainMessageLog.imageUrl);
      })
      .catch((err) => console.error(err));

    return response;
  };
  useEffect(() => {
    const userId = router.query.userId
      ? Number(router.query.userId)
      : undefined;
    if (userId !== undefined) {
      getUserMessageLog(userId);
    }
  }, [router.query]);
  return (
    <Layout>
      <Container>
        <ChatRoom
          chatMessage={chatMessages}
          yourProfileImage={yourProfileImage}
          roomId={mainRoomId.toString()}
        />
        <ChatRoomList chatListInfo={chatListInfo} mainRoomId={mainRoomId} />
      </Container>
    </Layout>
  );
}
