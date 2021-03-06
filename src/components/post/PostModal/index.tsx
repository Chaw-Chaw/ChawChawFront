import React, { useMemo } from "react";
import styled from "styled-components";
import { LocaleLanguage } from "../../common";
import { PostModalInfoList } from "./PostModalInfoList";
import { PostModalSocialList } from "./PostModalSocialList";
import { PostModalInfo } from "./PostModalInfo";
import { PostModalImage } from "./PostModalImage";
import { PostModalActive } from "./PostModalActive";
import { PostModalContent } from "./PostModalContent";
import { PostModalProps } from "../../../types/post";

const PostModal: React.FC<PostModalProps> = (props) => {
  const now = new Date();
  const dateArr = props.regDate.substring(0, 10).split("-");
  const stDate = new Date(
    Number(dateArr[0]),
    Number(dateArr[1]),
    Number(dateArr[2])
  );
  const endDate = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate()
  );
  const pastDays =
    (endDate.getTime() - stDate.getTime()) / (1000 * 60 * 60 * 24);
  const repCountry = props.repCountry;
  const repLanguage = LocaleLanguage[props.repLanguage] || "";
  const repHopeLanguage = LocaleLanguage[props.repHopeLanguage] || "";
  const country = props.country;
  const language = useMemo(() => {
    return props.language.map((item) => LocaleLanguage[item] || "");
  }, [props.language]);
  const hopeLanguage = useMemo(() => {
    return props.hopeLanguage.map((item) => LocaleLanguage[item] || "");
  }, [props.hopeLanguage]);

  return (
    <PostModalBox>
      <PostModalImage src={`${props.imageUrl}`} />
      <PostUserName>{props.name}</PostUserName>
      <PostModalActive id={props.id} isLike={props.isLike} />
      <PostModalInfoList
        title="I am from"
        values={country}
        mainValue={repCountry}
      />
      <PostModalInfoList
        title="I can speak"
        values={language}
        mainValue={repLanguage}
      />
      <PostModalInfoList
        title="I want to speak"
        values={hopeLanguage}
        mainValue={repHopeLanguage}
      />
      <PostModalContent content={props.content} />
      <PostModalSocialList
        title="Contact to me"
        faceBookUrl={props.facebookUrl}
        instagramUrl={props.instagramUrl}
      />
      <PostModalInfo
        regDate={String(pastDays)}
        views={props.views}
        likes={props.likes}
      />
    </PostModalBox>
  );
};

export default React.memo(PostModal);

const PostModalBox = styled.div`
  position: fixed;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 750px;
  @media (max-height: 900px) {
    height: 550px;
  }
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  border-radius: 20px;
  box-sizing: border-box;
  overflow: auto;

  @keyframes slide-in-bottom {
    0% {
      -webkit-transform: translateY(1000px);
      transform: translateY(1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }

  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  .post-image {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  @media (max-width: 500px) {
    width: 320px;
  }
`;

const PostUserName = styled.h2`
  margin: 0px auto;
  font-size: 1.5rem;
  font-weight: 900;
`;
