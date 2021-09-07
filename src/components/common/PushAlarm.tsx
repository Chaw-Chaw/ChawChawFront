import { useContext, useEffect, useState } from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import { ChatContext } from "../../store/ChatContext";
import { ChatBox } from "./ChatBox";
import HeartImage from "../../../public/Layout/heart.png";

const PushAlarm: React.FC = () => {
  const { newMessages, pushMessages } = useContext(ChatContext);

  return (
    <PushAlarmContainer>
      {newMessages.length > 0
        ? pushMessages.map((item: any, index) => {
            return (
              <AlarmChatBox key={index}>
                {item.imageUrl ? (
                  <ChatBox
                    imageUrl={item.imageUrl}
                    regDate={item.regDate.split("T").join(" ")}
                    sender={item.sender}
                    roomId={item.roomId}
                    onClick={() => {}}
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
                    onClick={() => {}}
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
    </PushAlarmContainer>
  );
};

export { PushAlarm };

const PushAlarmContainer = styled.div`
  pointer-events: all;
  position: fixed;
  top: 150px;
  left: -80px;
  height: calc(100vh - 400px);
  @media (max-width: 768px) {
    top: 80px;
  }
  width: 300px;
  background-color: none;
  z-index: 200;
`;

const AlarmChatBox = styled.div`
  @keyframes slide-right {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(100px);
      transform: translateX(100px);
    }
  }
  animation: slide-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;
