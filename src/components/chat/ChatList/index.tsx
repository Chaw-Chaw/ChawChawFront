import styled from "styled-components";
import React from "react";
import { ChatBox } from "../../common";
import { arrayRemovedItem } from "../../../utils";
import { useAppSelector } from "../../../hooks/redux";
import {
  CHATROOM_TYPE,
  IMAGE_MSG,
  IMAGE_TYPE,
  NEW_CHATROOM_MSG,
} from "../../../constants";

const ChatList: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const totalMessages = useAppSelector((state) => state.chat.totalMessages);

  const manufactureMessages = totalMessages.map((item) => {
    const limitMessageWord = 20;
    const isNewChatRoom = item.messages.length <= 0;
    const lastMessageInfo = item.messages[item.messages.length - 1];
    const lastMessage = (() => {
      if (isNewChatRoom) {
        return NEW_CHATROOM_MSG;
      }
      if (lastMessageInfo.messageType === IMAGE_TYPE) {
        return IMAGE_MSG;
      }
      return lastMessageInfo.message;
    })();
    const limitMessage =
      lastMessage.length > limitMessageWord
        ? lastMessage.substring(0, limitMessageWord) + "..."
        : lastMessage;
    const chatRoomImageUrl = arrayRemovedItem(
      user.imageUrl,
      item.participantImageUrls
    )[0];
    const sender = arrayRemovedItem(user.name, item.participantNames)[0];
    const senderId = arrayRemovedItem(user.id, item.participantIds)[0];
    const regDate = isNewChatRoom ? "" : lastMessageInfo.regDate;

    return (
      <ChatBox
        key={item.roomId}
        imageUrl={chatRoomImageUrl}
        regDate={regDate}
        sender={sender}
        roomId={item.roomId}
        senderId={senderId}
        context={limitMessage}
        type={CHATROOM_TYPE}
      />
    );
  });

  return (
    <Outline>
      <Inner>{totalMessages.length !== 0 && manufactureMessages}</Inner>
    </Outline>
  );
};

export default React.memo(ChatList);

const Outline = styled.div`
  border: none;
  box-sizing: border-box;
  overflow: auto;
  height: 100%;
  width: 100%;
  max-width: 100%;
  padding: 20px;
`;

const Inner = styled.div`
  overflow: auto;
  border-left: 1px solid ${(props) => props.theme.secondaryColor};
  box-sizing: border-box;
  padding: 20px;
  height: 100%;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  @keyframes slide-in-right {
    0% {
      -webkit-transform: translateX(1024px);
      transform: translateX(1024px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }

  animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  @media (max-width: 1024px) {
    border: none;
    @keyframes slide-in-bottom {
      0% {
        -webkit-transform: translateY(1024px);
        transform: translateY(1024px);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        opacity: 1;
      }
    }
    animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
`;
