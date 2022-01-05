import { useRouter } from "next/router";
import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { LIMIT_NEWALARM_SIZE } from "../../../constants";
import { RiHome2Line } from "react-icons/ri";
import { BsBoxArrowRight, BsChatDots } from "react-icons/bs";
import { AlarmCount, ChangeLanguageDropDown } from "../../common";
import { POST_PAGE_URL } from "../../../constants/pageUrls";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { chatActions } from "../../../store/chatSlice";
import { ChatRoomHeaderType } from "../../../types/chat";
import { leaveChat } from "../../../store/actions/chatActions";
import { asyncErrorHandle } from "../../../store/actions/alertActions";

const MChatRoomHeader: React.FC<ChatRoomHeaderType> = (props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const newMessages = useAppSelector((state) => state.chat.newMessages);

  const handleClickBackHomeBtn: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push(POST_PAGE_URL);
  };

  const handleClickViewChatListBtn: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    dispatch(chatActions.updateIsViewChatList());
  };

  const handleClickLeaveChatBtn: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      await dispatch(leaveChat());
    } catch (error) {
      dispatch(asyncErrorHandle(error));
    }
  };

  const newMessageNumber = newMessages.length !== 0 && (
    <AlarmCount>
      <span>
        {newMessages.length > LIMIT_NEWALARM_SIZE
          ? LIMIT_NEWALARM_SIZE
          : newMessages.length}
      </span>
    </AlarmCount>
  );

  return (
    <Header>
      <MessagesHeaderIcons>
        <BackHomeButton onClick={handleClickBackHomeBtn}>
          <RiHome2Line />
        </BackHomeButton>
        <LeaveChatButton onClick={handleClickLeaveChatBtn}>
          <BsBoxArrowRight />
        </LeaveChatButton>
        <ChatListViewButtonBox>
          <ViewChatListButton onClick={handleClickViewChatListBtn}>
            <BsChatDots />
            {newMessageNumber}
          </ViewChatListButton>
        </ChatListViewButtonBox>
      </MessagesHeaderIcons>
      <ChangeLanguageDropDown
        selectLanguage={props.selectLanguage}
        setSelectLanguage={props.setSelectLanguage}
      />
    </Header>
  );
};

const ChatRoomHeader = React.memo(MChatRoomHeader);

export { ChatRoomHeader };

const Header = styled.div`
  align-items: center;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: ${(props) =>
    props.theme.id === "light"
      ? "1px solid rgb(0, 0, 0, 0.2)"
      : "1px solid rgb(255, 255, 255, 0.2)"};
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  height: 50px;
  z-index: 20;
  @media (max-width: 1024px) {
    align-items: center;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: ${(props) =>
      props.theme.id === "light"
        ? "1px solid rgb(0, 0, 0, 0.2)"
        : "1px solid rgb(255, 255, 255, 0.2)"};
    background-color: ${(props) => props.theme.bodyBackgroundColor};
    height: 50px;
    z-index: 20;
  }
  @media (max-width: 768px) {
    top: 70px;
    position: fixed;
    left: 0px;
    align-items: center;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: ${(props) =>
      props.theme.id === "light"
        ? "1px solid rgb(0, 0, 0, 0.2)"
        : "1px solid rgb(255, 255, 255, 0.2)"};
    background-color: ${(props) => props.theme.bodyBackgroundColor};
    height: 50px;
    z-index: 20;
  }
`;

const MessagesHeaderIcons = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const MessageHeaderButton = styled.button`
  display: flex;
  border: none;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  cursor: pointer;
  width: 44px;
  svg {
    font-size: 2rem;
    color: ${(props) => props.theme.primaryColor};
  }
`;

const ChatListViewButtonBox = styled.div`
  position: relative;
  display: none;
  @media (max-width: 1024px) {
    display: flex;
  }
`;

const BackHomeButton = styled(MessageHeaderButton)``;
const LeaveChatButton = styled(MessageHeaderButton)``;
const ViewChatListButton = styled(MessageHeaderButton)``;
