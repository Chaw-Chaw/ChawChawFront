import styled from "styled-components";
import React, { useState } from "react";
import DefaultImage from "../../../public/Layout/btsSugar.jpeg";
import Link from "next/link";
import Image from "next/image";
import { AiFillEye, AiFillHeart, AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { DropDownBox, Button } from "../common";

interface PostModalProps {
  viewCount?: number;
  pastDate?: number;
  likeCount?: number;
  visible?: boolean;
  userName?: string;
}

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
  height: 700px;
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
  .post-image {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  @media (max-width: 500px) {
    width: 320px;
  }
`;
const DropDownOutline = styled.div`
  margin-right: 0px;
`;

const DropDownMainBox = styled(DropDownOutline)`
  padding: 5px;
  border-radius: 20rem;
  position: relative;
  border: 2px solid ${(props) => props.theme.primaryColor};
`;

const DropDownMainText = styled.div`
  padding: 0px 10px;
  color: ${(props) => props.theme.primaryColor};
  position: absolute;
  top: -15px;
  left: 50%;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  transform: translateX(-50%);
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
const PostModalInfoBox = styled.div`
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
  margin-left: 20px;
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
  margin-right: 20px;
  svg {
    margin-right: 5px;
  }
`;

const PostInfoListBox = styled.div`
  padding: 10px 20px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const PostInfoTitle = styled.h2`
  font-size: 1rem;
  margin: 0px;
  width: 150px;
  max-width: 110px;
`;

const PostInfoIconBox = styled.div`
  gap: 2px 2px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const PostImageSection = styled.div`
  width: 100%;
  height: 300px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PostImageHeadSection = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${(props) => props.theme.primaryColor};
`;

const PostImageBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 200px;
  width: 200px;
  border-radius: 50%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
  border: 10px solid ${(props) => props.theme.primaryColor};
  .post-modal-image {
    border-radius: 50%;
  }
`;

const PostUserName = styled.h2`
  margin: 0px auto;
  font-size: 1.5rem;
  font-weight: 900;
`;

const PostChatButton = styled(Button)`
  margin: 5px auto;
  min-height: 30px;
  @media (max-width: 500px) {
    width: 150px;
  }
`;

const PostSocialUrlBox = styled.div`
  display: flex;
  font-size: 1.4rem;
  width: 100%;
`;

const SocialUrlText = styled.a`
  font-size: 1rem;
  margin-left: 10px;
`;
const PostSocialList: React.FC<{ title?: string; values?: string }> = (
  props
) => {
  const valueLists = [
    "https://www.facebook.com/",
    "https://www.instagram.com/",
  ];
  return (
    <PostInfoListBox>
      <PostInfoTitle>{props.title}</PostInfoTitle>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <PostSocialUrlBox>
          <FaFacebook />
          <SocialUrlText href={valueLists[0]}>{valueLists[0]}</SocialUrlText>
        </PostSocialUrlBox>
        <PostSocialUrlBox>
          <AiFillInstagram />
          <SocialUrlText href={valueLists[1]}>{valueLists[1]}</SocialUrlText>
        </PostSocialUrlBox>
      </div>
    </PostInfoListBox>
  );
};

const PostImage: React.FC<{ src: StaticImageData }> = (props) => {
  return (
    <PostImageSection>
      <PostImageHeadSection />
      <PostImageBox>
        <Image
          src={props.src}
          alt="프로필 이미지"
          width="200"
          height="200"
          objectFit="cover"
          className="post-modal-image"
        />
      </PostImageBox>
    </PostImageSection>
  );
};

const PostInfoList: React.FC<{ title?: string; values?: string[] }> = (
  props
) => {
  const valueLists = ["Arabic", "Bosnian", "French", "Korean"];
  const colors = ["#06C074", "#5A65E8", "#4BC6DA", "#A52929"];
  return (
    <PostInfoListBox>
      <PostInfoTitle>{props.title}</PostInfoTitle>
      <PostInfoIconBox>
        {valueLists.map((item, index) => {
          if (index === 0) {
            return (
              <DropDownMainBox>
                <DropDownMainText>main</DropDownMainText>
                <DropDownBox
                  fontWeight="900"
                  fontSize="0.7rem"
                  width="80px"
                  height="30px"
                  color="white"
                  value={item}
                  backgroundColor={colors[index % 4]}
                />
              </DropDownMainBox>
            );
          } else {
            return (
              <DropDownOutline key={index}>
                <DropDownBox
                  fontWeight="900"
                  fontSize="0.7rem"
                  width="80px"
                  height="30px"
                  color="white"
                  value={item}
                  backgroundColor={colors[index % 4]}
                />
              </DropDownOutline>
            );
          }
        })}
      </PostInfoIconBox>
    </PostInfoListBox>
  );
};

const PostModalInfo: React.FC<PostModalProps> = (props) => {
  return (
    <PostModalInfoBox>
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
    </PostModalInfoBox>
  );
};

const PostButtonBox = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const PostLikeBox = styled.div`
  position: absolute;
  right: 35px;
  cursor: pointer;
  svg {
    color: ${(props) => props.theme.primaryColor};
    font-size: 45px;
  }
`;

const PostModal: React.FC<PostModalProps> = (props) => {
  return (
    <PostModalBox visible={props.visible}>
      <PostImage src={DefaultImage}></PostImage>
      <PostUserName>BTS sugar</PostUserName>
      <PostButtonBox>
        <Link href="/chat">
          <a>
            <PostChatButton secondary width="250px" height="45px">
              Try Chat
            </PostChatButton>
          </a>
        </Link>
        <PostLikeBox>
          <AiFillHeart />
        </PostLikeBox>
      </PostButtonBox>
      <PostInfoList title="I am from" />
      <PostInfoList title="I can speak" />
      <PostInfoList title="I want to speak" />
      <PostSocialList title="Contact to me"></PostSocialList>
      <PostModalContent>{props.children}</PostModalContent>
      <PostModalInfo
        pastDate={props.pastDate}
        viewCount={props.viewCount}
        likeCount={props.likeCount}
      />
    </PostModalBox>
  );
};

export default PostModal;
