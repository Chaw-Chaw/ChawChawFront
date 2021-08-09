import React, { ChangeEvent, useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import DefaultImage from "../../../../public/Layout/default_profile.png";
import { Button } from "../../common";
import { AuthContext } from "../../../store/AuthContext";

interface ProfileImageProps {
  onChange: (e: ChangeEvent) => void;
  onClick: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
  border-right: 1px solid ${(props) => props.theme.secondaryColor};
  button {
    margin: 5px 0px;
  }
  .profile-image {
    border-radius: 20px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
  }
  @media (max-width: 768px) {
    margin: 10px auto;
    padding-bottom: 20px;
    border-right: 0px;
  }
`;
const ImageBox = styled.div``;

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
  @keyframes color-change-2x {
    0% {
      background: ${(props) => props.theme.primaryColor};
    }
    100% {
      background: ${(props) => props.theme.visitedColor};
    }
  }
  :active {
    animation: color-change-2x 200ms linear alternate both;
  }
`;

const ProfileImage: React.FC<ProfileImageProps> = (props) => {
  const { user } = useContext(AuthContext);
  const profileImage = (() => {
    if (user?.imageUrl === undefined || user?.imageUrl === "default.png")
      return `https://mylifeforcoding.com/users/image?imageUrl=default.png`;
    else
      return `https://mylifeforcoding.com/users/image?imageUrl=${user?.imageUrl}`;
  })();

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
        onChange={props.onChange}
      />
      <Button onClick={props.onClick} width="100%">
        이미지 제거
      </Button>
    </Container>
  );
};
export { ProfileImage };
