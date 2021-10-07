import styled from "styled-components";
import { PostCard } from "./PostCard";
import { CountryLocale, LocaleLanguage } from "../common";

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
      <PostSectionInner>
        <PostSectionBox>
          {props.postInfo
            ? props.postInfo.map((item: any, index) => {
                const now = new Date();
                const dateArr = item.regDate.substring(0, 10).split("-");
                const stDate = new Date(dateArr[0], dateArr[1], dateArr[2]);
                const endDate = new Date(
                  now.getFullYear(),
                  now.getMonth() + 1,
                  now.getDate()
                );
                const pastDays =
                  (endDate.getTime() - stDate.getTime()) /
                  (1000 * 60 * 60 * 24);
                const repCountry =
                  CountryLocale[item.repCountry].toLowerCase() || "";
                const repLanguage = LocaleLanguage[item.repLanguage] || "";
                const repHopeLanguage =
                  LocaleLanguage[item.repHopeLanguage] || "";

                return (
                  <PostCard
                    id={item.id}
                    name={item.name}
                    key={index}
                    viewCount={item.views}
                    likeCount={item.likes}
                    pastDate={pastDays}
                    imageUrl={item.imageUrl}
                    repCountry={repCountry}
                    repLanguage={repLanguage}
                    repHopeLanguage={repHopeLanguage}
                    content={item.content}
                  />
                );
              })
            : null}
        </PostSectionBox>
      </PostSectionInner>
    </PostSectionContainer>
  );
};

export default PostSection;

const PostSectionBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px 25px;
  width: 950px;
  @media (max-width: 1055px) {
    width: 625px;
  }
  @media (max-width: 695px) {
    width: 300px;
  } ;
`;

const PostSectionContainer = styled.div`
  width: 100%;
`;

const PostSectionInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
