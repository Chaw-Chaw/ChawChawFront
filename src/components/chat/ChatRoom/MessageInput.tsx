import styled from "styled-components";
import { TextArea } from "../../common/Input";
import { AiOutlinePicture, AiOutlineSend } from "react-icons/ai";
import {
  ChangeEventHandler,
  KeyboardEvent,
  MouseEventHandler,
  useContext,
  useState,
} from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../../store/AuthContext";
import { useAlert } from "react-alert";
import { ChatContext } from "../../../store/ChatContext";

interface MessageInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onKeyPress: (e: KeyboardEvent) => void;
  onClick: MouseEventHandler<HTMLDivElement>;
  publish: (message: string, messageType: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = (props) => {
  const { mainRoomId } = useContext(ChatContext);
  const isNotActive = mainRoomId === -1 ? true : false;
  const [cookies] = useCookies(["accessToken"]);
  const { grantRefresh } = useContext(AuthContext);
  const accessToken = cookies.accessToken;
  const message = useAlert();

  const sendImage = async (image: FormData) => {
    const response = await axios
      .post("/chat/image", image, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      })
      .catch((err) => err.response);

    if (response.status === 401) {
      grantRefresh();
      return;
    }

    if (response.data.isSuccess) {
      console.log(response.data.data, "image Upload");
      const imageUrl = response.data.data;
      props.publish(imageUrl, "IMAGE");
    } else {
      console.error(response.data, "이미지 업로드 실패");
      return;
    }
    return;
  };
  const imageSend: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file === undefined) return;
    if (file.size > 1024 * 1024 * 5) {
      message.error("5MB 이상 파일을 업로드 할 수 없습니다.");
      return;
    }
    const image = new FormData();
    image.append("file", file);
    sendImage(image);
  };

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
        <PictureIconBox htmlFor="image-file">
          <input
            id="image-file"
            type="file"
            style={{ display: "none" }}
            accept="image/png, image/jpeg"
            onChange={imageSend}
          />
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
  }
  top: 3.5px;
  right: 10px;
`;
