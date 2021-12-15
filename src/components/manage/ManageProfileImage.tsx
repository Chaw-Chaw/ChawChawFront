import { MouseEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { Button } from "../common";
import { DEFAULT_PROFILE_IMAGE } from "../../constants";
import { useSendImage } from "../../hooks/api/useSendImage";

const ManageProfileImage: React.FC<{ userImage: string; userId: number }> = (
  props
) => {
  const { putImage, sendManageProfileImage, deleteManageProfileImage } =
    useSendImage();
  const [profileImage, setProfileImage] = useState(props.userImage);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    try {
      const image = putImage(e);
      if (!image) throw new Error("파일이 없습니다.");
      image.append("userId", String(props.userId));
      const imageUrl = await sendManageProfileImage(image);
      setProfileImage(imageUrl);
      // message.success("이미지 업로드 성공!");
    } catch (err) {
      // message.error(err.message);
    }
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    await deleteManageProfileImage(props.userId);
    setProfileImage(DEFAULT_PROFILE_IMAGE);
  };

  useEffect(() => {
    setProfileImage(props.userImage);
  }, [props.userImage]);

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
export default ManageProfileImage;

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
