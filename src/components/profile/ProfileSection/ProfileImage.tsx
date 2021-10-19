import { MouseEventHandler, useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import { AuthContext } from "../../../store/AuthContext";
import { Button } from "../../common";
import axios from "axios";
import { useAlert } from "react-alert";
import { DEFAULT_PROFILE_IMAGE } from "../../../constants";
import { getSecureLocalStorage } from "../../../utils";

const ProfileImage: React.FC = () => {
  const { user, updateUser, grantRefresh } = useContext(AuthContext);
  const profileImage = user?.imageUrl || DEFAULT_PROFILE_IMAGE;
  const message = useAlert();

  const sendImage = async (image: FormData) => {
    const response = await axios
      .post("/users/image", image, {
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
      console.log(response, "sendImage 실패");
      return;
    }
    message.success("이미지 업로드 성공!");
    updateUser({ imageUrl: response.data.data });
    return;
  };

  const imageUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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

  const deleteImage: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const response = await axios
      .delete("/users/image", {
        headers: {
          "Content-Type": "application/json",
          Authorization: getSecureLocalStorage("accessToken"),
          Accept: "*/*",
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
      deleteImage(e);
      return;
    }

    if (!response.data.isSuccess) {
      console.error(response.data);
      return;
    }
    updateUser({ imageUrl: response.data.data });
  };

  return (
    <Container>
      <Image
        src={profileImage}
        width="180px"
        height="180px"
        alt="프로필 이미지"
        objectFit="cover"
        className="profile-image"
      />

      <InputFileButton htmlFor="image-file">이미지 업로드</InputFileButton>
      <input
        id="image-file"
        type="file"
        style={{ display: "none" }}
        accept="image/png, image/jpeg"
        onChange={imageUpload}
      />
      <Button onClick={deleteImage} width="100%">
        이미지 제거
      </Button>
    </Container>
  );
};
export default ProfileImage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
  border-right: 1px solid ${(props) => props.theme.secondaryColor};
  button {
    margin: 5px 0px;
    font-family: "BMJUA";
  }
  .profile-image {
    border-radius: 20px;
    border-radius: 20px;
  }
  @media (max-width: 768px) {
    margin: 10px auto;
    padding-bottom: 20px;
    border-right: 0px;
  }
`;

const InputFileButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.primaryColor};
  width: 100%;
  height: 2rem;
  border-radius: 20rem;
  margin-top: 10px;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  border: 1px solid ${(props) => props.theme.primaryColor};
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  white-space: pre-line;
  padding: 0px;

  &:disabled {
    background-color: ${(props) => props.theme.bodyBackgroundColor};
    color: ${(props) => props.theme.secondaryColor};
  }
  transition: background-color 0.5s;
  :hover {
    background-color: ${(props) => props.theme.visitedColor};
    color: white;
  }
`;
