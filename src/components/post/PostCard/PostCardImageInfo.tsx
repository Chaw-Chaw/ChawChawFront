import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { PostCardImageInfoProps } from "../../../types/post";

const MPostCardImageInfo: React.FC<PostCardImageInfoProps> = (props) => {
  return (
    <PostImageInfoBox>
      <PostImageName>
        <Image
          src={
            `/Layout/flags/${props.repCountry}.png` || `/public/Layout/chaw.png`
          }
          width={17}
          height={17}
          alt="국가"
        />
        {` ${props.name}`}
      </PostImageName>
      <PostImageUserInfo>{`🗣 ${props.repLanguage}`}</PostImageUserInfo>
      <PostImageUserInfo>{`📖 ${props.repHopeLanguage}`}</PostImageUserInfo>
    </PostImageInfoBox>
  );
};

const PostCardImageInfo = React.memo(MPostCardImageInfo);
export { PostCardImageInfo };

const PostImageInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 10px;
  box-sizing: border-box;
  bottom: 2px;
  width: 180px;
  height: 50px;
`;

const PostImageName = styled.span`
  color: ${(props) => (props.theme.id === "light" ? "black" : "white")};
  font-weight: 900;
  font-size: 1.5rem;
`;

const PostImageUserInfo = styled(PostImageName)`
  font-size: 1rem;
  margin-top: 8px;
`;
