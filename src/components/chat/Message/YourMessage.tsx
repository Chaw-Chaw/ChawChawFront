import React, { MouseEventHandler, useCallback, useState } from "react";
import styled from "styled-components";
import { MessageContext } from "./MessageContext";
import { MessageImage } from "./MessageImage";

import { MessageImageBox, RegDateMessage, MessageText } from "./MyMessage";
import { LanguageLocale, ModalLayout } from "../../common";

import Image from "next/image";
import { ChatProfile } from "./ChatProfile";
import { YourMessageProps } from "../../../types/chat";
import { useAppDispatch } from "../../../hooks/redux";
import { translateContext } from "../../../store/chatSlice";
import { asyncErrorHandle } from "../../../store/alertSlice";
import { IMAGE_TYPE, MESSAGE_TYPE_YOURS } from "../../../constants";

const MYourMessage: React.FC<YourMessageProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [context, setContext] = useState(props.context);
  const dispatch = useAppDispatch();
  const selectLanguage = LanguageLocale[props.selectLanguage[0]];

  const handleClickMsgBox: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (props.imageUrl) return;
    setIsActive((pre) => !pre);
    return;
  };

  const handleClickMsgUserImage: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClickChatProfile: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      setOpen(false);
    },
    []
  );

  const handleClickMsgContext: React.MouseEventHandler<HTMLDivElement> = async (
    e
  ) => {
    try {
      e.preventDefault();
      if (props.imageUrl) return;
      const convertContext = await dispatch(
        translateContext({ context, selectLanguage })
      ).unwrap();
      setContext(convertContext);
      return;
    } catch (error) {
      dispatch(asyncErrorHandle(error));
    }
  };

  const chatProfileModal = (
    <>
      <ModalLayout onClick={handleClickChatProfile} />
      <ChatProfile
        name={props.userName || ""}
        imageUrl={props.src}
        setOpen={setOpen}
        userId={props.userId}
      />
    </>
  );

  const messageImage = (
    <MessageImageBox>
      <Image
        className="chat_image"
        src={`${props.imageUrl}`}
        alt="채팅 이미지"
        layout="fill"
      />
    </MessageImageBox>
  );

  const messageText = (
    <YourMessageBox onClick={handleClickMsgBox}>
      <MessageContext
        isActive={isActive}
        setIsActive={setIsActive}
        type={MESSAGE_TYPE_YOURS}
        onClick={handleClickMsgContext}
      />
      <MessageText>{context}</MessageText>
    </YourMessageBox>
  );
  return (
    <>
      <YourMessageContainer>
        <YourMessageInfo>
          <MsgUserImageWrap onClick={handleClickMsgUserImage}>
            <MessageImage src={props.src} />
          </MsgUserImageWrap>
          <YourMessageContent>
            <MessageUserName>{props.userName}</MessageUserName>
            {props.messageType === IMAGE_TYPE ? messageImage : messageText}
          </YourMessageContent>
        </YourMessageInfo>
        <RegDateMessage>{props.regDate}</RegDateMessage>
      </YourMessageContainer>
      {open && chatProfileModal}
    </>
  );
};

const YourMessage = React.memo(MYourMessage);
export { YourMessage };

const MsgUserImageWrap = styled.div`
  cursor: pointer;
`;

const YourMessageContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

const YourMessageInfo = styled.div`
  display: flex;
`;

const YourMessageBox = styled.div`
  cursor: pointer;
  position: relative;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  max-width: 300px;
  min-width: 70px;
  min-height: 50px;
  border: 1px solid ${(props) => props.theme.primaryColor};
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  border-radius: 20px;
  border-top-left-radius: 0px;
  margin-top: 2px;
  font-family: "Source Sans Pro";
`;

const MessageUserName = styled.h2`
  font-size: 1rem;
  margin: 0px;
  margin-bottom: 2px;
  color: ${(props) =>
    props.theme.id === "light"
      ? "rgb(126, 126, 126)"
      : props.theme.secondaryColor};
`;
const YourMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
