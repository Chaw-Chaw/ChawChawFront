import { useRouter } from "next/router";
import { useContext } from "react";
import { CHAT_PAGE_URL, LIMIT_NEWALARM_SIZE } from "../../../constants";
import { ChatContext } from "../../../store/ChatContext";
import { AlarmCount } from "../AlarmCount";

const ViewAlarmCount: React.FC = () => {
  const { newMessages, newLikes } = useContext(ChatContext);
  const router = useRouter();
  const newAlarmNumber =
    router.pathname !== CHAT_PAGE_URL
      ? newMessages.length + newLikes.length
      : newLikes.length;
  const alarmCount =
    newAlarmNumber > LIMIT_NEWALARM_SIZE ? LIMIT_NEWALARM_SIZE : newAlarmNumber;

  if (newAlarmNumber === 0) {
    return null;
  }

  return (
    <AlarmCount>
      <span>{alarmCount}</span>
    </AlarmCount>
  );
};

export { ViewAlarmCount };
