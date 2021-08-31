import { MouseEventHandler, useState } from "react";
import styled from "styled-components";
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
  const { Translate } = require("@google-cloud/translate").v2;
  const translate = new Translate();
  const regDate = props.regDate.split("T").join(" ");
  const [context, setContext] = useState(props.context);
  const selectLanguage = props.selectLanguage[0];

  const translateContext: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const translateText = async () => {
      let [translations] = await translate.translate(context, selectLanguage);
      translations = Array.isArray(translations)
        ? translations
        : [translations];
      console.log("Translations:");
      translations.forEach((translation: any, i: any) => {
        console.log(`${context[i]} => (${selectLanguage}) ${translation}`);
      });
    };
    // const convertContext = response.text;
    // console.log(convertContext, "번역된 언어");
    // setContext(convertContext);
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
