import axios from "axios";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import { GOOGLE_TRANSLATE_API_KEY } from "../../../constants";
import { LanguageLocale } from "../../common";
import { MessageContext } from "./MessageContext";

interface MyMessageProps {
  regDate: string;
  context: string;
  selectLanguage: string[];
  imageUrl?: string;
  messageType: string;
  scrollToBottom: () => void;
}

const MyMessage: React.FC<MyMessageProps> = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [context, setContext] = useState(props.context);
  const selectLanguage = LanguageLocale[props.selectLanguage[0]];

  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (props.imageUrl) return;
    setIsActive((pre) => !pre);
    return;
  };

  const translateContext: React.MouseEventHandler<HTMLDivElement> = async (
    e
  ) => {
    e.preventDefault();
    if (props.imageUrl) return;
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
    console.log(convertContext, "드디어 나오는거냐");
    return;
  };

  // 새로운 메세지 가 props 로 들어오면 context 재설정
  useEffect(() => {
    setContext(props.context);
  }, [props.context]);

  return (
    <MyMessageContainer>
      {props.messageType === "IMAGE" ? (
        <MessageImageBox>
          <Image
            className="chat_image"
            src={`${props.imageUrl}`}
            alt="채팅 이미지"
            layout="fill"
            onLoad={props.scrollToBottom}
          />
        </MessageImageBox>
      ) : (
        <>
          <MyMessageBox onClick={onClick}>
            <MessageContext
              isActive={isActive}
              setIsActive={setIsActive}
              type="me"
              onClick={translateContext}
            />
            <MessageText>{context}</MessageText>
          </MyMessageBox>
        </>
      )}
      <RegDateMessage>{props.regDate}</RegDateMessage>
    </MyMessageContainer>
  );
};

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
