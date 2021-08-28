import styled from "styled-components";
import React from "react";
import { LocaleLanguage } from "../../common";
import { PostModalInfoList } from "./PostModalInfoList";
import { PostModalSocialList } from "./PostModalSocialList";
import { PostModalHeadProps, PostModalInfo } from "./PostModalInfo";
import { PostModalImage } from "./PostModalImage";
import { PostModalActive } from "./PostModalActive";

interface PostModalInfoProps extends PostModalHeadProps {
  content: string;
  country: string[];
  facebookUrl: string;
  hopeLanguage: string[];
  id: number;
  imageUrl: string;
  instagramUrl: string;
  language: string[];
  name: string;
  repCountry: string;
  repHopeLanguage: string;
  repLanguage: string;
}
interface PostModalProps extends PostModalInfoProps {
  visible: boolean;
}

const PostModal: React.FC<PostModalProps> = (props) => {
  const now = new Date();
  const dateArr = props.days.substring(0, 10).split("-");
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
  const language = props.language.map((item) => LocaleLanguage[item] || "");
  const hopeLanguage = props.hopeLanguage.map(
    (item) => LocaleLanguage[item] || ""
  );

  return (
    <PostModalBox visible={props.visible}>
      <PostModalImage src={`${props.imageUrl}`} />
      <PostUserName>{props.name}</PostUserName>
      <PostModalActive id={props.id} />
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
      <PostModalSocialList
        title="Contact to me"
        faceBookUrl={props.facebookUrl}
        instagramUrl={props.instagramUrl}
      />
      <PostModalContent>
        <PostModalContentText disabled value={props.content} />
      </PostModalContent>
      <PostModalInfo
        days={String(pastDays)}
        views={props.views}
        follows={props.follows}
      />
    </PostModalBox>
  );
};

export default PostModal;
export type { PostModalInfoProps };

const PostModalBox = styled.div<{ visible?: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
  width: 500px;
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  height: 750px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  border-radius: 20px;
  box-sizing: border-box;
  overflow: auto;
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
const PostModalContent = styled.div`
  width: 100%;
  padding: 5px 20px;
  box-sizing: border-box;
  min-height: 150px;
  max-height: 150px;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  font-weight: 400;
  font-size: 0.9rem;
  border-bottom: 1px solid
    ${(props) =>
      props.theme.id === "light"
        ? " rgb(0, 0, 0, 0.2)"
        : "rgb(255, 255, 255, 0.2)"};
`;

const PostModalContentText = styled.textarea`
  width: 100%;
  color: ${(props) => (props.theme.id === "light" ? "black" : "white")};
  height: 100%;
  font-size: 1rem;
  resize: none;
  box-sizing: border-box;
  font-family: "BMJUA";
  border: none;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
`;

const PostUserName = styled.h2`
  margin: 0px auto;
  font-size: 1.5rem;
  font-weight: 900;
`;
