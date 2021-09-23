import { MouseEventHandler, useContext, useState } from "react";
import styled from "styled-components";
import { ChatContext } from "../../store/ChatContext";
import { ChatBox } from "./ChatBox";
import { AiFillBell, AiFillHeart } from "react-icons/ai";
import { AlarmCount } from "./AlarmCount";
import { NextRouter, useRouter, withRouter } from "next/router";

const PushAlarm: React.FC<{ router: NextRouter }> = (props) => {
  const { newMessages, setMainRoomId, newLikes } = useContext(ChatContext);
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
      {/* {props.router.pathname !== "/chat" ? <AiFillBell /> : <AiFillHeart />} */}
      <AiFillBell />
      {(() => {
        const newAlarms =
          props.router.pathname !== "/chat"
            ? newMessages.length + newLikes.length
            : newLikes.length;

        if (newAlarms !== 0) {
          return (
            <AlarmCount>
              <span>{newAlarms > 99 ? 99 : newAlarms}</span>
            </AlarmCount>
          );
        } else null;
      })()}
      <PushAlarmContainer isActive={isActive}>
        <PushAlarmTitle>New Alarms</PushAlarmTitle>
        {props.router.pathname !== "/chat" ? (
          <>
            <PushAlarmBox>
              {newMessages.length > 0 ? (
                newMessages.map((item: any, index) => {
                  return (
                    <AlarmChatBox key={index}>
                      <ChatBox
                        imageUrl={item.imageUrl}
                        regDate={item.regDate.split("T").join(" ")}
                        sender={item.sender}
                        roomId={-2}
                        onClick={() => {
                          setMainRoomId(item.roomId);
                          moveChat(item.senderId);
                        }}
                        context={
                          item.message.lenght > 20
                            ? item.message.substring(0, 20) + "..."
                            : item.message
                        }
                        chatList
                      />
                    </AlarmChatBox>
                  );
                })
              ) : (
                <EmptyNewMessageMark>
                  <span>No new messages</span>
                </EmptyNewMessageMark>
              )}
            </PushAlarmBox>
            <Divider />
          </>
        ) : null}

        <PushAlarmBox>
          {newLikes.length > 0 ? (
            newLikes.map((item: any, index) => {
              return (
                <AlarmChatBox key={index}>
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
                </AlarmChatBox>
              );
            })
          ) : (
            <EmptyNewMessageMark>
              <span>No new follow alarms</span>
            </EmptyNewMessageMark>
          )}
        </PushAlarmBox>
      </PushAlarmContainer>
    </AlarmBell>
  );
};

export default withRouter(PushAlarm);

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
  padding: 0px 5px 5px 5px;
  box-sizing: border-box;
  overflow: auto;
  max-height: calc(100vh - 250px);
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

const Divider = styled.div`
  width: calc(100% - 10px);
  margin: 5px auto;
  box-sizing: border-box;
  border-top: 0.1px solid ${(props) => props.theme.secondaryColor};
`;
