import { useRouter } from "next/router";
import React, { useContext } from "react";
import { CHAT_PAGE_URL, LIMIT_NEWALARM_SIZE } from "../../../constants";
import { useAppSelector } from "../../../hooks/redux";
import { ChatContext } from "../../../store/ChatContext";
import { AlarmCount } from "../AlarmCount";

const MViewAlarmCount: React.FC = () => {
  const { newMessages, newLikes } = useAppSelector((state) => state.chat);
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

const ViewAlarmCount = React.memo(MViewAlarmCount);
export { ViewAlarmCount };
