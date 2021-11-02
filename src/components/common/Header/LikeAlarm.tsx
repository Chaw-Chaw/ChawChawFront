import { useContext } from "react";
import { ChatContext } from "../../../store/ChatContext";
import { ChatBox } from "../ChatBox";
import { EmptyAlarm } from "./EmptyAlarm";
import { AlarmChatBox, PushAlarmBox } from "./MessageAlarm";

const LikeAlarm: React.FC = () => {
  const { newLikes } = useContext(ChatContext);

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
          type="LIKEALARM"
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
export { LikeAlarm };
