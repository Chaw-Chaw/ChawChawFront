import { useContext } from "react";
import styled from "styled-components";
import { ChatBox } from "../../common";
import { ChatContext } from "../../../store/ChatContext";
import { AuthContext } from "../../../store/AuthContext";
import { arrayRemovedItem } from "../../../utils";
import { useRouter } from "next/router";

const ChatList: React.FC = (props) => {
  const { totalMessage } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  return (
    <Outline>
      <Inner>
        {totalMessage.length === 0
          ? null
          : totalMessage.map((item) => {
              const limitMessageWord = 20;
              const isNewChatRoom = item.messages.length <= 0;
              const lastMessageInfo = item.messages[item.messages.length - 1];
              const lastMessage = (() => {
                if (isNewChatRoom) {
                  return "새로운 채팅방이 생성되었습니다.";
                }
                if (lastMessageInfo.messageType === "IMAGE") {
                  return "🏞 사진";
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
              const sender = arrayRemovedItem(
                user.name,
                item.participantNames
              )[0];
              const senderId = arrayRemovedItem(
                user.id,
                item.participantIds
              )[0];
              const regDate = isNewChatRoom ? "" : lastMessageInfo.regDate;

              return (
                <ChatBox
                  key={item.roomId}
                  imageUrl={chatRoomImageUrl}
                  regDate={regDate}
                  sender={sender}
                  roomId={item.roomId}
                  onClick={() => {
                    // setIsViewChatList(false);
                    // setMainRoom({ id: item.roomId, userId: senderId });
                    router.push({
                      pathname: "/chat",
                      query: { userId: senderId },
                    });
                    // location.href = `/chat?userId=${senderId}`;
                    return;
                  }}
                  context={limitMessage}
                />
              );
            })}
      </Inner>
    </Outline>
  );
};

export default ChatList;

const Outline = styled.div`
  border: none;
  box-sizing: border-box;
  overflow: auto;
  height: calc(100vh - 150px);
  height: calc(var(--vh, 1vh) * 100 - 150px);
  /* margin-bottom: 50px; */
  width: 100%;
  max-width: 400px;
  padding: 20px 20px 20px 20px;

  @media (max-width: 1024px) {
    max-width: 100%;
    height: calc(100vh - 210px);
    height: calc(var(--vh, 1vh) * 100 - 210px);
  }

  @media (max-width: 768px) {
    max-width: 100%;
    height: calc(100vh - 130px);
    height: calc(var(--vh, 1vh) * 100 - 130px);
  }
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
