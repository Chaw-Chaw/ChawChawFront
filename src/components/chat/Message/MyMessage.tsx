import axios from "axios";
import Image from "next/image";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import styled from "styled-components";
import { GOOGLE_TRANSLATE_API_KEY } from "../../../constants";
import { LanguageLocale } from "../../common";
import { ChatMessageProps } from "./ChatMessage";
import { MessageContext } from "./MessageContext";
import { RegDateMessage } from "./YourMessage";

interface MyMessageProps {
  regDate: string;
  context: string;
  selectLanguage: string[];
  imageUrl?: string;
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
  return (
    <MyMessageContainer>
      <MyMessageBox onClick={onClick}>
        <MessageContext
          isActive={isActive}
          setIsActive={setIsActive}
          type="me"
          onClick={translateContext}
        />
        {props.imageUrl ? (
          <Image
            src={`${props.imageUrl}`}
            alt="채팅 이미지"
            width="230px"
            height="230px"
            objectFit="contain"
          />
        ) : (
          <div>{context}</div>
        )}
      </MyMessageBox>
      <RegDateMessage>{props.regDate}</RegDateMessage>
    </MyMessageContainer>
  );
};

export { MyMessage };
export type { MyMessageProps };
const MyMessageBox = styled.div`
  cursor: pointer;
  position: relative;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  max-width: 300px;
  min-width: 70px;
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
