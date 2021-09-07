import React, { useContext } from "react";
import styled from "styled-components";
import { ChatBox } from "../../common";
import { ChatContext } from "../../../store/ChatContext";

const ChatList: React.FC = (props) => {
  const { totalMessage, setMainRoomId } = useContext(ChatContext);

  return (
    <Outline>
      <Inner>
        {totalMessage.length === 0
          ? null
          : totalMessage.map((item) => {
              const limitMessageWord = 20;
              const lastMessageInfo = item.messages[item.messages.length - 1];
              const lastMessage = lastMessageInfo.message;
              const limitMessage =
                lastMessage.length > limitMessageWord
                  ? lastMessage.substring(0, limitMessageWord) + "..."
                  : lastMessage;
              return (
                <ChatBox
                  key={item.roomId}
                  imageUrl={item.imageUrl}
                  regDate={lastMessageInfo.regDate}
                  sender={item.sender}
                  roomId={item.roomId}
                  onClick={(e) => {
                    e.preventDefault();
                    setMainRoomId(item.roomId);
                    return;
                  }}
                  context={limitMessage}
                />
              );
            })}
      </Inner>
    </Outline>
  );
};

export default ChatList;

const Outline = styled.div`
  border: none;
  box-sizing: border-box;
  overflow: auto;
  height: calc(100vh - 150px);
  /* margin-bottom: 50px; */
  width: 100%;
  max-width: 400px;
  padding: 20px 20px 20px 20px;
  @media (max-width: 1000px) {
    max-width: 100%;
    padding: 0px;
    height: calc(100vh - 250px);
  }
`;

const Inner = styled.div`
  overflow: auto;

  border-left: 1px solid ${(props) => props.theme.secondaryColor};
  @media (max-width: 1000px) {
    border: none;
  }
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
`;
