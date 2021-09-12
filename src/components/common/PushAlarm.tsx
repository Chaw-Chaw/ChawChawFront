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
import { BiMessageRoundedX } from "react-icons/bi";
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
          {newMessages.length > 0 ? (
            newMessages.map((item: any, index) => {
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
                      chatList
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
                      chatList
                    />
                  )}
                </AlarmChatBox>
              );
            })
          ) : (
            <EmptyNewMessageMark>
              <BiMessageRoundedX />
              <span>No new messages</span>
            </EmptyNewMessageMark>
          )}
        </PushAlarmBox>
      </PushAlarmContainer>
    </AlarmBell>
  );
};

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

const PushAlarmBox = styled.div`
  width: 100%;
  padding: 0px 5px 0px 5px;
  box-sizing: border-box;
  @media (max-height: calc(100vh - 250px)) {
    padding: 0px 15px 0px 5px;
    overflow: auto;
  }
`;

const AlarmChatBox = styled.div``;

const EmptyNewMessageMark = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.bodyFontColor};
  svg {
    margin-right: 10px;
    color: ${(props) => props.theme.bodyFontColor};
    font-size: 2rem;
  }
  span {
    font-size: 1.5rem;
  }
`;
