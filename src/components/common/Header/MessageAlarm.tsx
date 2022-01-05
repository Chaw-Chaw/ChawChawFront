import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import {
  CHAT_PAGE_URL,
  IMAGE_MSG,
  IMAGE_TYPE,
  CHATALARM_TYPE,
} from "../../../constants";
import { useAppSelector } from "../../../hooks/redux";
import { ChatBox } from "../ChatBox";
import { EmptyAlarm } from "./EmptyAlarm";

const MMessageAlarm: React.FC = () => {
  const router = useRouter();
  const newMessages = useAppSelector((state) => state.chat.newMessages);

  const alarmMessages = newMessages.map((item) => {
    const context = item.messageType === IMAGE_TYPE ? IMAGE_MSG : item.message;
    return (
      <AlarmChatBox key={item.regDate}>
        <ChatBox
          imageUrl={item.imageUrl}
          regDate={item.regDate.split("T").join(" ")}
          sender={item.sender}
          context={
            context.length > 20 ? context.substring(0, 20) + "..." : context
          }
          roomId={item.roomId}
          type={CHATALARM_TYPE}
          senderId={item.senderId}
        />
      </AlarmChatBox>
    );
  });

  if (router.pathname === CHAT_PAGE_URL) {
    return null;
  }

  return (
    <>
      <PushAlarmBox>
        {newMessages.length > 0 ? (
          alarmMessages
        ) : (
          <EmptyAlarm title="No new Messages" />
        )}
      </PushAlarmBox>
      <Divider />
    </>
  );
};

const MessageAlarm = React.memo(MMessageAlarm);
export { MessageAlarm, PushAlarmBox, AlarmChatBox };

const PushAlarmBox = styled.div`
  width: 100%;
  padding: 0px 5px 5px 5px;
  box-sizing: border-box;
  overflow: auto;
  max-height: calc(100vh - 250px);
`;

const AlarmChatBox = styled.div``;

const Divider = styled.div`
  width: calc(100% - 10px);
  margin: 5px auto;
  box-sizing: border-box;
  border-top: 0.1px solid ${(props) => props.theme.secondaryColor};
`;
