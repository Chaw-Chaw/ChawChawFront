import Image from "next/image";
import styled from "styled-components";
import { CgBlock, CgUnblock } from "react-icons/cg";
import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { organizeChatMessages } from "../../../store/chatSlice";
import { blockUser, unBlockUser } from "../../../store/actions/postActions";

interface ChatProfileProps {
  name: string;
  imageUrl: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userId: number;
}

const MChatProfile: React.FC<ChatProfileProps> = (props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [isBlock, setIsBlock] = useState(user.blockIds?.includes(props.userId));
  const isBlockUser = user.blockIds?.includes(props.userId);

  const handleClickBlockBtn: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    await dispatch(blockUser(props.userId));
    setIsBlock(true);
  };
  const handleClickUnblockBtn: MouseEventHandler<HTMLDivElement> = async (
    e
  ) => {
    e.preventDefault();
    await dispatch(unBlockUser(props.userId));
    setIsBlock(false);
    dispatch(organizeChatMessages());
    // 새로고침
  };

  useEffect(() => {
    setIsBlock(isBlockUser);
  }, [isBlockUser]);

  const chatBlock = isBlock ? (
    <ChatUnblockButton onClick={handleClickUnblockBtn}>
      <CgUnblock />
      <span>차단해제</span>
    </ChatUnblockButton>
  ) : (
    <ChatBlockButton onClick={handleClickBlockBtn}>
      <CgBlock />
      <span>차단하기</span>
    </ChatBlockButton>
  );

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
      <ChatBlockBox>{chatBlock}</ChatBlockBox>
    </ChatProfileBox>
  );
};

const ChatProfile = React.memo(MChatProfile);
export { ChatProfile };

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
