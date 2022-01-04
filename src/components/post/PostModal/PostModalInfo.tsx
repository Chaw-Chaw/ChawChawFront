import React from "react";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import styled from "styled-components";
import { PostModalHeadProps } from "../../../types/post";

const MPostModalInfo: React.FC<PostModalHeadProps> = (props) => {
  return (
    <PostModalInfoBox>
      <PostModalDateViewBox>
        <PostModalPastDateBox>{props.regDate} days ago</PostModalPastDateBox>
        <PostModalViewCountBox>
          {props.views}
          <AiFillEye />
        </PostModalViewCountBox>
      </PostModalDateViewBox>
      <PostModalLikeBox>
        <AiFillHeart />
        {props.likes}
      </PostModalLikeBox>
    </PostModalInfoBox>
  );
};

const PostModalInfo = React.memo(MPostModalInfo);
export { PostModalInfo };

const PostModalInfoBox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: ${(props) =>
    props.theme.id === "light" ? "rgb(0,0,0,0.5)" : "white"};
  border-top: 1px solid
    ${(props) =>
      props.theme.id === "light"
        ? " rgb(0, 0, 0, 0.2)"
        : "rgb(255, 255, 255, 0.2)"};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;
const PostModalDateViewBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  align-items: flex-start;
  justify-content: space-between;
`;
const PostModalPastDateBox = styled.div`
  margin-top: 10px;
`;
const PostModalViewCountBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  svg {
    margin-left: 3px;
  }
`;
const PostModalLikeBox = styled.div`
  width: 100%;
  font-size: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  svg {
    margin-right: 5px;
    color: red;
  }
`;
