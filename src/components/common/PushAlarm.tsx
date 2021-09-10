import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import { ChatContext } from "../../store/ChatContext";
import { ChatBox } from "./ChatBox";
import HeartImage from "../../../public/Layout/heart.png";
import { AiFillBell } from "react-icons/ai";
import { AlarmCount } from "./AlarmCount";
import { ScreenContext } from "../../store/ScreenContext";
import { useRouter } from "next/router";
const PushAlarm: React.FC = () => {
  const { newMessages } = useContext(ChatContext);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  const controlPushAlarm: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsActive((pre) => !pre);
  };

  const moveChat = (senderId: number) => {
    router.push({ pathname: "/chat", query: { userId: senderId } });
  };

  return (
    <AlarmBell onClick={controlPushAlarm}>
      <AiFillBell />
      {newMessages.length !== 0 && (
        <AlarmCount>
          <span>{newMessages.length > 99 ? 99 : newMessages.length}</span>
        </AlarmCount>
      )}
      <PushAlarmContainer isActive={isActive}>
        <PushAlarmTitle>New messages</PushAlarmTitle>
        <PushAlarmBox>
          {newMessages.length > 0
            ? newMessages.map((item: any, index) => {
                return (
                  <AlarmChatBox key={index}>
                    {item.imageUrl ? (
                      <ChatBox
                        imageUrl={item.imageUrl}
                        regDate={item.regDate.split("T").join(" ")}
                        sender={item.sender}
                        roomId={-2}
                        onClick={() => {
                          moveChat(item.senderId);
                        }}
                        context={
                          item.message.lenght > 20
                            ? item.message.substring(0, 20) + "..."
                            : item.message
                        }
                      />
                    ) : (
                      <ChatBox
                        imageUrl={`/Layout/heart.png`}
                        regDate={item.regDate}
                        sender={item.followType}
                        roomId={-2}
                        onClick={() => {
                          moveChat(-2);
                        }}
                        context={`${item.name}님이 ${item.followType} 하셨습니다.`.substring(
                          0,
                          20
                        )}
                      />
                    )}
                  </AlarmChatBox>
                );
              })
            : null}
        </PushAlarmBox>
      </PushAlarmContainer>
    </AlarmBell>
  );
};

export { PushAlarm };

const AlarmBell = styled.div`
  display: flex;
  position: relative;
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
  background-color: white;
  flex-direction: column;
  top: 55px;
  right: 0%;

  border-radius: 20px;
  @media (max-width: 768px) {
    right: -20px;
  }
  height: calc(100vh - 200px);
  overflow: auto;
  width: 315px;
  z-index: 100;
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

const PushAlarmBox = styled.div`
  height: calc(100vh - 250px);
  overflow: auto;
  width: 100%;
  padding: 0px 15px 0px 5px;
  box-sizing: border-box;
`;

const AlarmChatBox = styled.div``;
