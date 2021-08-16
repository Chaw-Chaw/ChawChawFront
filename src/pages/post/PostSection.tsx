import React from "react";
import styled from "styled-components";
import { PostCard } from "../../components/post/PostCard";
import { CountryEmoji, LocaleLanguage } from "../../components/common";

const PostSectionBox = styled.div`
  width: calc(100% - 50px);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px 25px;
  @media (max-width: 1100px) {
    max-width: 700px;
  }
  @media (max-width: 768px) {
    max-width: 350px;
  } ;
`;
const PostSectionContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

interface PostSectionProps {
  postInfo: {
    content: string;
    days: string;
    follows: number;
    id: number;
    imageUrl: string;
    repCountry: string;
    repHopeLanguage: string;
    repLanguage: string;
    views: number;
  }[];
}

const PostSection: React.FC<PostSectionProps> = (props) => {
  return (
    <PostSectionContainer>
      <PostSectionBox>
        {props.postInfo.map((item: any, index) => {
          const now = new Date();
          const dateArr = item.days.substring(0, 10).split("-");
          const stDate = new Date(dateArr[0], dateArr[1], dateArr[2]);
          const endDate = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            now.getDate()
          );
          const pastDays =
            (endDate.getTime() - stDate.getTime()) / (1000 * 60 * 60 * 24);
          const repCountry = CountryEmoji[item.repCountry]
            ? CountryEmoji[item.repCountry]
            : "";
          const repLanguage = LocaleLanguage[item.repLanguage]
            ? LocaleLanguage[item.repLanguage]
            : "";
          const repHopeLanguage = LocaleLanguage[item.repHopeLanguage]
            ? LocaleLanguage[item.repHopeLanguage]
            : "";

          return (
            <PostCard
              id={item.id}
              name={item.name}
              key={index}
              viewCount={item.views}
              likeCount={item.follows}
              pastDate={pastDays}
              imageUrl={item.imageUrl}
              repCountry={repCountry}
              repLanguage={repLanguage}
              repHopeLanguage={repHopeLanguage}
            >
              {item.content}
            </PostCard>
          );
        })}
      </PostSectionBox>
    </PostSectionContainer>
  );
};

export default PostSection;
