import { MouseEventHandler, useState } from "react";
import styled from "styled-components";
import { MessageContext } from "./MessageContext";
import { MessageImage } from "./MessageImage";
import { GOOGLE_TRANSLATE_API_KEY } from "../../../constants";
import {
  MyMessageProps,
  MessageImageBox,
  RegDateMessage,
  MessageText,
} from "./MyMessage";
import { LanguageLocale, ModalLayout } from "../../common";
import axios from "axios";
import Image from "next/image";
import ChatProfile from "../ChatProfile";

interface YourMessageProps extends MyMessageProps {
  src: string;
  userName?: string;
  userId: number;
}

const YourMessage: React.FC<YourMessageProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [context, setContext] = useState(props.context);
  const selectLanguage = LanguageLocale[props.selectLanguage[0]];
  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (props.imageUrl) return;
    setIsActive((pre) => !pre);
    return;
  };

  const profileHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setOpen((pre) => !pre);
  };

  const translateContext: React.MouseEventHandler<HTMLDivElement> = async (
    e
  ) => {
    e.preventDefault();
    const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;
    console.log(context, selectLanguage, "번역 시작");
    const response: any = await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params: {
          q: context,
          source: "",
          target: selectLanguage,
        },
      })
      .catch((err) => err.response);
    if (response.status !== 200) {
      console.error(response, "번역 에러");
      return;
    }
    const convertContext = response.data.data.translations[0].translatedText;
    setContext(convertContext);
    return;
  };

  return (
    <>
      <YourMessageContainer>
        {props.imageUrl ? (
          <MessageImageBox>
            <Image
              className="chat_image"
              src={`${props.imageUrl}`}
              alt="채팅 이미지"
              layout="fill"
            />
          </MessageImageBox>
        ) : (
          <YourMessageInfo>
            <ChatProfileWrap onClick={profileHandler}>
              <MessageImage src={props.src} />
            </ChatProfileWrap>
            <YourMessageContent>
              <MessageUserName>{props.userName}</MessageUserName>
              <YourMessageBox onClick={onClick}>
                <MessageContext
                  isActive={isActive}
                  setIsActive={setIsActive}
                  type="you"
                  onClick={translateContext}
                />
                <MessageText>{context}</MessageText>
              </YourMessageBox>
            </YourMessageContent>
          </YourMessageInfo>
        )}
        <RegDateMessage>{props.regDate}</RegDateMessage>
      </YourMessageContainer>
      {open ? (
        <>
          <ModalLayout onClick={profileHandler} />
          <ChatProfile
            name={props.userName || ""}
            imageUrl={props.src}
            setOpen={setOpen}
            userId={props.userId}
          />
        </>
      ) : null}
    </>
  );
};

export { YourMessage };

const ChatProfileWrap = styled.div`
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
