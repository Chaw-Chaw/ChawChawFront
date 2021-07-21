import React from "react";
import styled from "styled-components";
import { PostCard } from "../../components/post/PostCard";

const PostSectionBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  @media (max-width: 1100px) {
    max-width: 700px;
  }
  @media (max-width: 733px) {
    max-width: 350px;
  } ;
`;

const PostSection: React.FC = (props) => {
  return (
    <PostSectionBox>
      {Array.from({ length: 17 }, () => 1).map((_, index) => {
        return (
          <PostCard key={index} viewCount={200} likeCount={200} pastDate={200}>
            안녕 Army들 ~ 어? 예쁘다.
            <br /> Hi~ 에이치아이~ BTS 언어를 배우고 싶어요 한국에 있는
            아미들하고 언어교환해요 즐겁게 즐겁게! <br />
            <br />
            나랑 놀사람 얼른 여기로 붙어요!! 나는 한국인이구 영어랑 프랑스어를
            배우고 싶어요! <br />
            <br />
            185에 마른 근육도 쩔구 노래랑 인기도 대박 많아요
            <br /> 나랑 놀사람~ 유학생들이 bts V를 팔로워 하는게 얼마나 어려운데
            이렇게 팬미팅 하는거지 어쩌구 저쩌구 <br />
          </PostCard>
        );
      })}
    </PostSectionBox>
  );
};

export default PostSection;
