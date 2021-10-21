import Image from "next/image";
import styled from "styled-components";
import { CgBlock, CgUnblock } from "react-icons/cg";
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { ChatContext } from "../../../store/ChatContext";
import { AuthContext } from "../../../store/AuthContext";

interface ChatProfileProps {
  name: string;
  imageUrl: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userId: number;
}

const ChatProfile: React.FC<ChatProfileProps> = (props) => {
  const { blockUser, unblockUser, organizeChatMessages, mainRoom } =
    useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const [isBlock, setIsBlock] = useState(user.blockIds?.includes(props.userId));

  const handleClickBlockBtn: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    blockUser(props.userId);
    setIsBlock(true);
  };
  const handleClickUnblockBtn: MouseEventHandler<HTMLDivElement> = async (
    e
  ) => {
    e.preventDefault();
    await unblockUser(props.userId);
    setIsBlock(false);
    organizeChatMessages(mainRoom.id);
    // 새로고침
    // 원래라면 해당방에 해당하는 Messages만 따로 불러와서 setMainMessage를 다시해야합니다.
  };

  useEffect(() => {
    setIsBlock(user.blockIds?.includes(props.userId));
  }, [JSON.stringify(user.blockIds)]);

  return (
    <ChatProfileBox>
      <ChatProfileImageSection>
        <ChatProfileImageHeadSection />
        <ChatProfileImageBox>
          <Image
            src={props.imageUrl}
            alt="프로필 이미지"
            width="200"
            height="200"
            objectFit="cover"
            className="chat-profile-image"
          />
        </ChatProfileImageBox>
      </ChatProfileImageSection>
      <ChatUserName>{props.name}</ChatUserName>

      <ChatBlockBox>
        {isBlock ? (
          <ChatUnblockButton onClick={handleClickUnblockBtn}>
            <CgUnblock />
            <span>차단해제</span>
          </ChatUnblockButton>
        ) : (
          <ChatBlockButton onClick={handleClickBlockBtn}>
            <CgBlock />
            <span>차단하기</span>
          </ChatBlockButton>
        )}
      </ChatBlockBox>
    </ChatProfileBox>
  );
};

export default ChatProfile;

const ChatProfileBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 360px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  border-radius: 20px;
  box-sizing: border-box;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  .chat-profile-image {
    border-radius: 50%;
  }
`;

const ChatUserName = styled.h2`
  margin: 0px auto;
  font-size: 1.5rem;
  font-weight: 900;
`;

const ChatProfileImageSection = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ChatProfileImageHeadSection = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.theme.primaryColor};
`;

const ChatProfileImageBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 150px;
  width: 150px;
  border-radius: 50%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
  border: 10px solid ${(props) => props.theme.primaryColor};
  .post-modal-image {
    border-radius: 50%;
  }
`;

const ChatBlockBox = styled.div`
  margin-top: 20px;
  width: 100%;
  cursor: pointer;
  svg {
    font-size: 3.5rem;
    color: red;
  }
  span {
    font-weight: 300;
  }
`;

const ChatBlockButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ChatUnblockButton = styled(ChatBlockButton)``;
