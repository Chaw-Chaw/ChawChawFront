import styled from "styled-components";
import { TextArea } from "../../common/Input";
import { AiOutlinePicture, AiOutlineSend } from "react-icons/ai";
import {
  ChangeEventHandler,
  KeyboardEvent,
  MouseEventHandler,
  useRef,
  useState,
} from "react";

interface MessageInputProps {
  roomId: number;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onKeyPress: (e: KeyboardEvent) => void;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const MessageInput: React.FC<MessageInputProps> = (props) => {
  const isNotActive = props.roomId === -1 ? true : false;
  return (
    <InputBox>
      <InputBoxInner>
        <TextInput
          disabled={isNotActive}
          value={props.value}
          onChange={props.onChange}
          onKeyPress={(e) => {
            if (isNotActive) return;
            props.onKeyPress(e);
          }}
          placeholder="메세지를 입력해주세요."
          autoFocus
        />
        <PictureIconBox>
          <AiOutlinePicture />
        </PictureIconBox>
        <SendIconBox
          onClick={(e) => {
            e.preventDefault();
            if (isNotActive) return;
            props.onClick(e);
          }}
        >
          <AiOutlineSend />
        </SendIconBox>
      </InputBoxInner>
    </InputBox>
  );
};

export default MessageInput;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* min-width: 500px; */
  box-sizing: border-box;
  /* position: sticky;
  bottom: 0px; */
  /* left: 50%; */
  /* @media (max-width: 768px) {
    min-width: 320px;
  } */
  background-color: ${(props) => props.theme.bodyBackgroundColor};
`;

const InputBoxInner = styled.div`
  width: 100%;
  /* max-width: 450px; */
  position: relative;
  display: flex;
  justify-content: center;
  /* margin: 0px 20px; */
  /* @media (max-width: 768px) {
    min-width: 290px;
  } */
`;

const TextInput = styled(TextArea)`
  height: 50px;
  padding: 12px 110px 10px 15px;
  margin: 0px;
  overflow: auto;
  resize: none;
  border-radius: 20rem;
`;

const PictureIconBox = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  cursor: pointer;
  svg {
    height: 40px;
    width: 40px;
    color: ${(props) =>
      props.theme.id === "light" ? "rgb(0, 0, 0, 0.5)" : "white"};
  }
  top: 3.5px;
  right: 60px;
`;

const SendIconBox = styled(PictureIconBox)`
  right: 10px;
`;
