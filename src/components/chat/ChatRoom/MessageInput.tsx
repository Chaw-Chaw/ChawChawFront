import styled from "styled-components";
import { TextArea } from "../../common/Input";
import { AiOutlinePicture, AiOutlineSend } from "react-icons/ai";
import { ChangeEventHandler, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../store/AuthContext";
import { useAlert } from "react-alert";
import { ChatContext } from "../../../store/ChatContext";
import { INITIAL_ROOMID } from "../../../constants";
import { getSecureLocalStorage } from "../../../utils";

interface MessageInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  sendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = (props) => {
  const { mainRoom, publish } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const isNotActive = mainRoom.id === INITIAL_ROOMID ? true : false;
  const { grantRefresh } = useContext(AuthContext);
  const message = useAlert();

  const sendImage = async (image: FormData) => {
    const response = await axios
      .post("/chat/image", image, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: getSecureLocalStorage("accessToken"),
        },
      })
      .catch((err) => err.response);

    if (response.status === 401) {
      if (response.data.responseMessage === "다른 곳에서 접속함") {
        message.error(
          "현재 같은 아이디로 다른 곳에서 접속 중 입니다. 계속 이용하시려면 다시 로그인 해주세요.",
          {
            onClose: () => {
              window.localStorage.clear();
              window.location.href = "/account/login";
            },
          }
        );
      }
      await grantRefresh();
      await sendImage(image);
      return;
    }

    if (!response.data.isSuccess) {
      console.log(response.data, "이미지 업로드 실패");
      return;
    }

    const imageUrl = response.data.data;
    return imageUrl;
  };

  const imageMessageSend: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file === undefined) return;
    if (file.size > 1024 * 1024 * 5) {
      message.error("5MB 이상 파일을 업로드 할 수 없습니다.");
      return;
    }
    const image = new FormData();
    image.append("file", file);
    const imageUrl = await sendImage(image);
    publish(imageUrl, "IMAGE");
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
            if (e.key === "Enter") {
              e.preventDefault();
              if (user.blockIds?.includes(mainRoom.userId)) {
                message.error("차단한 사용자 입니다.");
                return;
              }
              props.sendMessage();
            }
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
            onChange={(e) => {
              e.preventDefault();
              if (user.blockIds?.includes(mainRoom.userId)) {
                message.error("차단한 사용자 입니다.");
                return;
              }
              imageMessageSend(e);
              // 같은 이미지 한번더 보낼수 있도록 이벤트 타겟 값 초기화
              e.target.value = "";
            }}
          />
          <AiOutlinePicture />
        </PictureIconBox>
        <SendIconBox
          onClick={(e) => {
            e.preventDefault();
            if (isNotActive) return;
            if (user.blockIds?.includes(mainRoom.userId)) {
              message.error("차단한 사용자 입니다.");
              return;
            }
            props.sendMessage();
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
    :hover {
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
    :hover {
      color: ${(props) => props.theme.primaryColor};
    }
  }
  top: 3.5px;
  right: 10px;
`;
