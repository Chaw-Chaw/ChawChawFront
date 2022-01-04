import React from "react";
import { LIKEALARM_TYPE } from "../../../constants";
import { useAppSelector } from "../../../hooks/redux";
import { ChatBox } from "../ChatBox";
import { EmptyAlarm } from "./EmptyAlarm";
import { AlarmChatBox, PushAlarmBox } from "./MessageAlarm";

const MLikeAlarm: React.FC = () => {
  const newLikes = useAppSelector((state) => state.chat.newLikes);

  const alarmlikeMessages = newLikes.map((item) => {
    return (
      <AlarmChatBox key={item.regDate + item.name}>
        <ChatBox
          imageUrl={`/Layout/heart.png`}
          regDate={item.regDate}
          sender={item.likeType}
          context={`${item.name}님이 ${item.likeType} 하셨습니다.`.substring(
            0,
            20
          )}
          type={LIKEALARM_TYPE}
        />
      </AlarmChatBox>
    );
  });

  return (
    <PushAlarmBox>
      {newLikes.length > 0 ? (
        alarmlikeMessages
      ) : (
        <EmptyAlarm title="No new likes Messages" />
      )}
    </PushAlarmBox>
  );
};

const LikeAlarm = React.memo(MLikeAlarm);
export { LikeAlarm };
