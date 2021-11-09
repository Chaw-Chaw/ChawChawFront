import { MouseEventHandler, useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import { AuthContext } from "../../../store/AuthContext";
import { Button } from "../../common";
import { useAlert } from "react-alert";
import { DEFAULT_PROFILE_IMAGE } from "../../../constants";
import { useSendImage } from "../../../hooks/api/useSendImage";

const ProfileImage: React.FC = () => {
  const { user, updateUser } = useContext(AuthContext);
  const { sendProfileImage, deleteProfileImage, putImage } = useSendImage();
  const profileImage = user?.imageUrl || DEFAULT_PROFILE_IMAGE;
  const message = useAlert();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const image = putImage(e);
    const imageUrl = await sendProfileImage(image);
    message.success("이미지 업로드 성공!");
    updateUser({ imageUrl });
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const imageUrl = await deleteProfileImage();
    updateUser({ imageUrl });
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
        onChange={handleChange}
      />
      <Button onClick={handleClick} width="100%">
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
  &:hover {
    background-color: ${(props) => props.theme.visitedColor};
    color: white;
  }
`;
