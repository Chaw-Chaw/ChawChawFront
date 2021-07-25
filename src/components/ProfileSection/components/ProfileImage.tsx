import React from "react";
import styled from "styled-components";
import Image from "next/image";
import DefaultImage from "../../../../public/Layout/chaw.png";
import { Button } from "../../common";

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
  @media (max-width: 768px) {
    margin: 10px auto;
    padding-bottom: 20px;
    border-right: 0px;
  }
`;

const ProfileImage: React.FC = () => {
  return (
    <Container>
      <Image
        src={DefaultImage}
        width="200px"
        height="200px"
        alt="프로필 이미지"
        objectFit="cover"
      />
      <Button secondary width="100%">
        이미지 업로드
      </Button>
      <Button width="100%">이미지 제거</Button>
    </Container>
  );
};
export { ProfileImage };
