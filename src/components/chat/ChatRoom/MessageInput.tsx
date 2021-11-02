import styled from "styled-components";
import { TextArea } from "../../common/Input";
import { AiOutlinePicture, AiOutlineSend } from "react-icons/ai";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useContext,
} from "react";
import axios from "axios";
import { AuthContext } from "../../../store/AuthContext";
import { useAlert } from "react-alert";
import { ChatContext } from "../../../store/ChatContext";
import { INITIAL_ROOMID } from "../../../constants";
import { useSendImage } from "../../../hooks/api/useSendImage";

interface MessageInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  sendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = (props) => {
  const { mainRoom } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const message = useAlert();
  const { sendImageMessage } = useSendImage();
  const isNotActive = mainRoom.id === INITIAL_ROOMID ? true : false;

  const handleKeyPress: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (isNotActive) return;
    if (e.key === "Enter") {
      e.preventDefault();
      if (user.blockIds?.includes(mainRoom.userId)) {
        message.error("차단한 사용자 입니다.");
        return;
      }
      props.sendMessage();
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (user.blockIds?.includes(mainRoom.userId)) {
      message.error("차단한 사용자 입니다.");
      return;
    }
    sendImageMessage(e);
    // 같은 이미지 한번더 보낼수 있도록 이벤트 타겟 값 초기화
    e.target.value = "";
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (isNotActive) return;
    if (user.blockIds?.includes(mainRoom.userId)) {
      message.error("차단한 사용자 입니다.");
      return;
    }
    props.sendMessage();
  };

  return (
    <InputBox>
      <InputBoxInner>
        <TextInput
          disabled={isNotActive}
          value={props.value}
          onChange={props.onChange}
          onKeyPress={handleKeyPress}
          placeholder="메세지를 입력해주세요."
          autoFocus
        />
        <PictureIconBox htmlFor="image-file">
          <input
            id="image-file"
            type="file"
            style={{ display: "none" }}
            accept="image/png, image/jpeg"
            onChange={handleChange}
          />
          <AiOutlinePicture />
        </PictureIconBox>
        <SendIconBox onClick={handleClick}>
          <AiOutlineSend />
        </SendIconBox>
      </InputBoxInner>
    </InputBox>
  );
};

export default MessageInput;

const InputBox = styled.div`
  @media (max-width: 768px) {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    margin: 0px auto;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
`;

const InputBoxInner = styled.div`
  width: 100%;
  max-width: 580px;
  position: relative;
  display: flex;
  justify-content: center;
`;

const TextInput = styled(TextArea)`
  height: 50px;
  padding: 12px 110px 10px 15px;
  margin: 0px;
  overflow: auto;
  resize: none;
  border-radius: 20rem;
`;

const PictureIconBox = styled.label`
  position: absolute;
  width: 40px;
  height: 40px;
  cursor: pointer;
  svg {
    height: 40px;
    width: 40px;
    color: ${(props) =>
      props.theme.id === "light" ? "rgb(0, 0, 0, 0.5)" : "white"};
    transition: color 0.5s;
    &:hover {
      color: ${(props) => props.theme.primaryColor};
    }
  }
  top: 3.5px;
  right: 60px;
`;

const SendIconBox = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  cursor: pointer;
  svg {
    height: 40px;
    width: 40px;
    color: ${(props) =>
      props.theme.id === "light" ? "rgb(0, 0, 0, 0.5)" : "white"};
    transition: color 0.5s;
    &:hover {
      color: ${(props) => props.theme.primaryColor};
    }
  }
  top: 3.5px;
  right: 10px;
`;
