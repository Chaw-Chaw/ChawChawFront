import styled from "styled-components";
import React, { useState } from "react";
import DefaultImage from "../../../public/Layout/btsSugar.jpeg";
import Image from "next/image";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import PostModal from "./PostModal";
import { ModalLayout } from "../common";

interface PostCardProps {
  viewCount?: number;
  pastDate?: number;
  likeCount?: number;
}

const PostCardBox = styled.div`
  /* margin: 0px 15px 20px 15px; */
  width: 300px;
  display: flex;
  flex-direction: column;
  height: 400px;
  max-height: 400px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  box-sizing: border-box;
  @keyframes kenburns-top {
    0% {
      -webkit-transform: scale(1) translateY(0);
      transform: scale(1) translateY(0);
      -webkit-transform-origin: 50% 5%;
      transform-origin: 50% 5%;
    }
    100% {
      -webkit-transform: scale(1.05) translateY(-5px);
      transform: scale(1.05) translateY(-5px);
      -webkit-transform-origin: top;
      transform-origin: top;
    }
  }
  :hover {
    animation: kenburns-top 0.2s ease-out both;
  }
`;

const PostCardContent = styled.div`
  width: 100%;
  padding: 5px 5px;
  box-sizing: border-box;
  min-height: 150px;
  max-height: 150px;
  overflow: hidden;
  font-weight: 400;
  font-size: 0.9rem;
  border-bottom: 1px solid
    ${(props) =>
      props.theme.id === "light"
        ? " rgb(0, 0, 0, 0.2)"
        : "rgb(255, 255, 255, 0.2)"};
`;
const PostCardInfoBox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: ${(props) =>
    props.theme.id === "light" ? "rgb(0,0,0,0.5)" : "white"};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;
const DateViewBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  align-items: flex-start;
  justify-content: space-between;
`;
const PastDateBox = styled.div`
  margin-top: 10px;
`;
const ViewCountBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  svg {
    margin-left: 3px;
  }
`;
const LikeBox = styled.div`
  width: 100%;
  font-size: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
  svg {
    margin-right: 5px;
  }
`;

const PostImageBox = styled.div`
  width: 100%;
  position: relative;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  .post-image {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
`;
const PostImageInfoBox = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 10px 10px;
  box-sizing: border-box;
  bottom: 2px;
  width: 100%;
`;

const PostImageName = styled.span`
  color: white;
  font-weight: 900;
  text-shadow: 1px 1px 2px ${(props) => props.theme.primaryColor};
  font-size: 1.2rem;
`;
const PostImageUserInfo = styled(PostImageName)`
  font-size: 1rem;
`;
const PostCardInfo: React.FC<PostCardProps> = (props) => {
  return (
    <PostCardInfoBox>
      <DateViewBox>
        <PastDateBox>{props.pastDate} days ago</PastDateBox>
        <ViewCountBox>
          {props.viewCount}
          <AiFillEye />
        </ViewCountBox>
      </DateViewBox>
      <LikeBox>
        <AiFillHeart />
        {props.likeCount}
      </LikeBox>
    </PostCardInfoBox>
  );
};

const PostCard: React.FC<PostCardProps> = (props) => {
  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen((open) => !open);
    console.log(open);
  };
  return (
    <>
      <PostCardBox onClick={handleModal}>
        <PostImageBox>
          <Image
            src={DefaultImage}
            alt="포스팅 프로필 이미지"
            width="300px"
            height="200px"
            className="post-image"
            objectFit="cover"
          />
          <PostImageInfoBox>
            <PostImageName>BTS sugar</PostImageName>
            <PostImageUserInfo>🇫🇷 French Korean</PostImageUserInfo>
          </PostImageInfoBox>
        </PostImageBox>
        <PostCardContent>{props.children}</PostCardContent>
        <PostCardInfo
          pastDate={props.pastDate}
          viewCount={props.viewCount}
          likeCount={props.likeCount}
        />
      </PostCardBox>
      <ModalLayout visible={open} onClick={handleModal} />
      <PostModal
        visible={open}
        pastDate={props.pastDate}
        viewCount={props.viewCount}
        likeCount={props.likeCount}
      >
        {props.children}
      </PostModal>
    </>
  );
};

export { PostCard };
