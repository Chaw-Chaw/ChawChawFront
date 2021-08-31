import axios, { AxiosResponse } from "axios";
import { MouseEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import { GOOGLE_TRANSLATE_API_KEY } from "../../../constants";
import { LanguageLocale } from "../../common";
import { MessageContext } from "./MessageContext";
import { MessageImage } from "./MessageImage";
import { MyMessage } from "./MyMessage";
import { YourMessage } from "./YourMessage";

interface ChatMessageProps {
  src?: string;
  userName?: string;
  regDate: string;
  context: string;
  selectLanguage: string[];
}

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
  const regDate = props.regDate.split("T").join(" ");

  return (
    <MessageContainer>
      {props.src ? (
        <YourMessage
          regDate={regDate}
          src={props.src}
          userName={props.userName}
          context={props.context}
          selectLanguage={props.selectLanguage}
        />
      ) : (
        <MyMessage
          context={props.context}
          regDate={regDate}
          selectLanguage={props.selectLanguage}
        />
      )}
    </MessageContainer>
  );
};

export default ChatMessage;
export type { ChatMessageProps };

const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
`;
