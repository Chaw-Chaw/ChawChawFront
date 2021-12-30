import React from "react";
import styled from "styled-components";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { PostCardInfoProps } from "../../../types/post";

const MPostCardInfo: React.FC<PostCardInfoProps> = (props) => {
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

const PostCardInfo = React.memo(MPostCardInfo);
export { PostCardInfo };

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
    color: red;
  }
`;
