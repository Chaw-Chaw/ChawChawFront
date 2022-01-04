import Image from "next/image";
import React, { MouseEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import { MyMessageProps } from "../../../types/chat";
import { useAppDispatch } from "../../../hooks/redux";
import { asyncErrorHandle } from "../../../store/alertSlice";
import { translateContext } from "../../../store/chatSlice";
import { LanguageLocale } from "../../common";
import { MessageContext } from "./MessageContext";
import { IMAGE_TYPE, MESSAGE_TYPE_MINE } from "../../../constants";

const MMyMessage: React.FC<MyMessageProps> = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [context, setContext] = useState(props.context);
  const selectLanguage = LanguageLocale[props.selectLanguage[0]];
  const dispatch = useAppDispatch();

  const handleClickMsgBox: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (props.imageUrl) return;
    setIsActive((pre) => !pre);
    return;
  };

  const handleClickMsgContext: React.MouseEventHandler<HTMLDivElement> = async (
    e
  ) => {
    try {
      e.preventDefault();
      if (props.imageUrl) return;
      const convertContext = await dispatch(
        translateContext({ context, selectLanguage })
      ).unwrap();
      if (!convertContext) return;
      setContext(convertContext);
      return;
    } catch (error) {
      dispatch(asyncErrorHandle(error));
    }
  };

  // 새로운 메세지 가 props 로 들어오면 context 재설정
  useEffect(() => {
    setContext(props.context);
  }, [props.context]);

  const imageMessage = (
    <MessageImageBox>
      <Image
        className="chat_image"
        src={`${props.imageUrl}`}
        alt="채팅 이미지"
        layout="fill"
        onLoad={props.scrollToBottom}
      />
    </MessageImageBox>
  );

  const contextMessage = (
    <MyMessageBox onClick={handleClickMsgBox}>
      <MessageContext
        isActive={isActive}
        setIsActive={setIsActive}
        type={MESSAGE_TYPE_MINE}
        onClick={handleClickMsgContext}
      />
      <MessageText>{context}</MessageText>
    </MyMessageBox>
  );

  return (
    <MyMessageContainer>
      {props.messageType === IMAGE_TYPE ? imageMessage : contextMessage}
      <RegDateMessage>{props.regDate}</RegDateMessage>
    </MyMessageContainer>
  );
};

const MyMessage = React.memo(MMyMessage);
export { MyMessage, MessageImageBox, RegDateMessage, MessageText };
export type { MyMessageProps };

const MessageText = styled.div`
  /* width: 100%; */
  display: inline-block;
  white-space: pre-line;
  word-break: break-all;
  max-width: 300px;
`;

const MessageImageBox = styled.div`
  max-width: 230px;
  max-height: 300px;
  > div {
    position: relative !important;
  }
  .chat_image {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
    border-radius: 20px;
  }
`;

const MyMessageBox = styled.div`
  cursor: pointer;
  position: relative;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  max-width: 300px;

  min-width: 50px;
  min-height: 50px;
  /* border: 1px solid ${(props) => props.theme.primaryColor}; */
  background-color: ${(props) => props.theme.primaryColor};
  border-radius: 20px;
  border-top-right-radius: 0px;
  color: white;
  font-family: "Source Sans Pro";
`;

const MyMessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
`;

const RegDateMessage = styled.div`
  font-size: 0.5rem;
  color: ${(props) => props.theme.secondaryColor};
  margin-top: 6px;
`;
