import styled from "styled-components";
import React, { ForwardedRef, RefObject, useContext, useState } from "react";
import DefaultImage from "../../../public/Layout/btsSugar.jpeg";
import Image from "next/image";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import PostModal from "./PostModal";
import { Message, ModalLayout } from "../common";
import axios from "axios";
import { CgNpm } from "react-icons/cg";
import { AuthContext } from "../../store/AuthContext";
import { useAlert } from "react-alert";
import { PostModalInfoProps } from "./PostModal";

interface PostCardInfoProps {
  pastDate: number;
  viewCount: number;
  likeCount: number;
}
interface PostCardProps extends PostCardInfoProps {
  imageUrl: string;
  repCountry: string;
  repLanguage: string;
  repHopeLanguage: string;
  name: string;
  id: number;
}

const PostCardBox = styled.div`
  /* margin: 0px 15px 20px 15px; */

  width: 300px;
  display: flex;
  flex-direction: column;
  height: 360px;
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
  padding: 5px 10px;
  box-sizing: border-box;
  min-height: 175px;
  max-height: 175px;
  overflow: hidden;
  font-weight: 400;
  font-size: 0.9rem;

  border-top: 1px solid
    ${(props) =>
      props.theme.id === "light"
        ? " rgb(0, 0, 0, 0.2)"
        : "rgb(255, 255, 255, 0.2)"};
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
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  .post-image {
    border-radius: 50%;
  }
  /* border-bottom: 1px solid
    ${(props) =>
    props.theme.id === "light"
      ? " rgb(0, 0, 0, 0.2)"
      : "rgb(255, 255, 255, 0.2)"}; */
`;
const PostImageInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 10px;
  box-sizing: border-box;
  bottom: 2px;
  width: 180px;
  height: 50px;
  /* margin-left: 60px; */
`;

const PostImageName = styled.span`
  color: black;
  font-weight: 900;
  /* text-shadow: 1px 1px 2px ${(props) => props.theme.primaryColor}; */
  font-size: 1.5rem;
`;
const PostImageUserInfo = styled(PostImageName)`
  font-size: 1rem;
`;

const PostCardInfo: React.FC<PostCardInfoProps> = (props) => {
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
  const initialPostInfo = {
    content: "",
    country: [],
    days: "",
    facebookUrl: "",
    follows: 0,
    hopeLanguage: [],
    id: 0,
    imageUrl: "default.png",
    instagramUrl: "",
    language: [],
    name: "",
    repCountry: "",
    repHopeLanguage: "",
    repLanguage: "",
    views: 0,
  };
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [postModalInfo, setPostModalInfo] =
    useState<PostModalInfoProps>(initialPostInfo);
  const message = useAlert();
  const handleModal = async () => {
    const response = await axios
      .get(`/users/${props.id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `${user?.token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res, "PostModal data");

        if (!res.data.isSuccess) {
          alert(`${props.id} 데이터 조회 실패`);
          throw new Error(res.data);
        }
        setPostModalInfo((pre) => {
          return { ...pre, ...res.data.data };
        });
        setOpen((open) => !open);
        return res.data.data;
      });
  };

  return (
    <div>
      <PostCardBox onClick={handleModal}>
        <PostImageBox>
          <Image
            src={`https://mylifeforcoding.com/users/image?imageUrl=${props.imageUrl}`}
            alt="포스팅 프로필 이미지"
            width="100px"
            height="100px"
            className="post-image"
            objectFit="cover"
          />
          <PostImageInfoBox>
            <PostImageName>{`${props.repCountry}  ${props.name}`}</PostImageName>
            <PostImageUserInfo>{`🗣 ${props.repLanguage}`}</PostImageUserInfo>
            <PostImageUserInfo>{`📖 ${props.repHopeLanguage}`}</PostImageUserInfo>
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
      {open ? (
        <PostModal
          visible={open}
          content={postModalInfo.content}
          country={postModalInfo.country}
          days={postModalInfo.days}
          facebookUrl={postModalInfo.facebookUrl}
          follows={postModalInfo.follows}
          hopeLanguage={postModalInfo.hopeLanguage}
          id={postModalInfo.id}
          imageUrl={postModalInfo.imageUrl}
          instagramUrl={postModalInfo.instagramUrl}
          language={postModalInfo.language}
          name={postModalInfo.name}
          repCountry={postModalInfo.repCountry}
          repHopeLanguage={postModalInfo.repHopeLanguage}
          repLanguage={postModalInfo.repLanguage}
          views={postModalInfo.views}
        >
          {props.children}
        </PostModal>
      ) : null}
    </div>
  );
};

export { PostCard };
