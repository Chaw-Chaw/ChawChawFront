import axios, { AxiosResponse } from "axios";
import { MouseEventHandler, useState } from "react";
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
  const [context, setContext] = useState(props.context);
  const selectLanguage = LanguageLocale[props.selectLanguage[0]];

  const translateContext: React.MouseEventHandler<HTMLDivElement> = async (
    e
  ) => {
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
          source: "ko",
          target: "en",
        },
      })
      .catch((err) => {
        console.log(err, "뭔데 에러야");
      });

    const convertContext = response.data.data.translations[0].translatedText;
    setContext(convertContext);
    console.log(convertContext, "드디어 나오는거냐");
    return;
  };

  return (
    <MessageContainer>
      {props.src ? (
        <YourMessage
          regDate={regDate}
          src={props.src}
          userName={props.userName}
          context={context}
          onClick={translateContext}
        />
      ) : (
        <MyMessage
          context={context}
          regDate={regDate}
          onClick={translateContext}
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
