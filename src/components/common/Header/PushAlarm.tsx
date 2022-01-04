import React, { MouseEventHandler, useState } from "react";
import styled from "styled-components";
import { AiFillBell } from "react-icons/ai";
import { ViewAlarmCount } from "./ViewAlarmCount";
import { MessageAlarm } from "./MessageAlarm";
import { LikeAlarm } from "./LikeAlarm";

const MPushAlarm: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const controlPushAlarm: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsActive((pre) => !pre);
  };

  return (
    <AlarmBell onClick={controlPushAlarm}>
      <AiFillBell />
      <ViewAlarmCount />
      <PushAlarmContainer isActive={isActive}>
        <PushAlarmTitle>New Alarms</PushAlarmTitle>
        <MessageAlarm />
        <LikeAlarm />
      </PushAlarmContainer>
    </AlarmBell>
  );
};

const PushAlarm = React.memo(MPushAlarm);
export { PushAlarm };

const AlarmBell = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;

  svg {
    width: 40px;
    height: 40px;
    color: #b1b1b1;
    @media (max-width: 768px) {
      color: white;
    }
  }
`;

const PushAlarmContainer = styled.div<{ isActive: boolean }>`
  position: absolute;
  display: ${(props) => (props.isActive ? "flex" : "none")};
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  flex-direction: column;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  top: 55px;
  right: 0px;
  border-radius: 20px;
  overflow: auto;
  width: 315px;
  z-index: 100;
  @media (max-width: 768px) {
    right: -20px;
  }
  @keyframes growDown {
    0% {
      transform: scaleY(0);
    }
    80% {
      transform: scaleY(1.1);
    }
    100% {
      transform: scaleY(1);
    }
  }
  animation: growDown 300ms ease-in-out forwards;
  transform-origin: top center;
`;

const PushAlarmTitle = styled.h1`
  font-size: 30px;
  margin: 20px auto;
  color: ${(props) => props.theme.primaryColor};
`;
