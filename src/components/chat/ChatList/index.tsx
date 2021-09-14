import { useContext } from "react";
import styled from "styled-components";
import { ChatBox } from "../../common";
import { ChatContext } from "../../../store/ChatContext";
import { AuthContext } from "../../../store/AuthContext";
import { DEFAULT_PROFILE_IMAGE } from "../../../constants";

const ChatList: React.FC = (props) => {
  const { totalMessage, setMainRoomId, setIsViewChatList } =
    useContext(ChatContext);
  const { user } = useContext(AuthContext);

  return (
    <Outline>
      <Inner>
        {totalMessage.length === 0
          ? null
          : totalMessage.map((item) => {
              const limitMessageWord = 20;
              const isNewChatRoom = item.messages.length <= 0;
              const lastMessageInfo = item.messages[item.messages.length - 1];
              const lastMessage = isNewChatRoom
                ? "새로운 채팅방이 생성되었습니다."
                : lastMessageInfo.message;
              const limitMessage =
                lastMessage.length > limitMessageWord
                  ? lastMessage.substring(0, limitMessageWord) + "..."
                  : lastMessage;
              // const limitMessage = lastMessage;
              const chatRoomImageUrl =
                item.participantImageUrls.length === 1
                  ? "/Layout/prohibition_icon.png"
                  : item.participantImageUrls[0];
              const sender =
                item.participantNames.find((item) => item !== user.name) ||
                "빈방";

              const regDate = isNewChatRoom ? "" : lastMessageInfo.regDate;

              return (
                <ChatBox
                  key={item.roomId}
                  imageUrl={chatRoomImageUrl}
                  regDate={regDate}
                  sender={sender}
                  roomId={item.roomId}
                  onClick={() => {
                    setIsViewChatList(false);
                    setMainRoomId(item.roomId);
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
  @media (max-width: 1000px) {
    max-width: 100%;
    padding: 0px;
    height: calc(100vh - 250px);
    height: calc(var(--vh, 1vh) * 100 - 250px);
  }
  @media (max-width: 768px) {
    height: calc(100vh - 180px);
    height: calc(var(--vh, 1vh) * 100 - 180px);
  }
`;

const Inner = styled.div`
  overflow: auto;

  border-left: 1px solid ${(props) => props.theme.secondaryColor};
  @media (max-width: 1000px) {
    border: none;
  }
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
`;
