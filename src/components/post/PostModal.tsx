import styled from "styled-components";
import React, { useContext, useState } from "react";
import DefaultImage from "../../../public/Layout/btsSugar.jpeg";
import Link from "next/link";
import Image from "next/image";
import {
  AiFillEye,
  AiOutlineHeart,
  AiFillHeart,
  AiFillInstagram,
} from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { DropDownBox, Button, CountryEmoji, LocaleLanguage } from "../common";
import { useRouter } from "next/router";
import axios from "axios";
import { AuthContext } from "../../store/AuthContext";
interface PostModalHeadProps {
  days: string;
  follows: number;
  views: number;
}

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
const PostSocialList: React.FC<{
  title: string;
  faceBookUrl: string;
  instagramUrl: string;
}> = (props) => {
  return (
    <PostInfoListBox>
      <PostInfoTitle>{props.title}</PostInfoTitle>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <PostSocialUrlBox>
          <FaFacebook />
          <SocialUrlText href={props.faceBookUrl}>
            {props.faceBookUrl}
          </SocialUrlText>
        </PostSocialUrlBox>
        <PostSocialUrlBox>
          <AiFillInstagram />
          <SocialUrlText href={props.instagramUrl}>
            {props.instagramUrl}
          </SocialUrlText>
        </PostSocialUrlBox>
      </div>
    </PostInfoListBox>
  );
};

const PostImage: React.FC<{ src: string }> = (props) => {
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

const PostInfoList: React.FC<{
  title: string;
  values: string[];
  mainValue: string;
}> = (props) => {
  // const valueLists = [props.mainValue, ...props.values];
  const valueLists = new Set([props.mainValue, ...props.values]);

  const colors = ["#06C074", "#5A65E8", "#4BC6DA", "#A52929"];
  return (
    <PostInfoListBox>
      <PostInfoTitle>{props.title}</PostInfoTitle>
      <PostInfoIconBox>
        {Array.from(valueLists).map((item, index) => {
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

const PostModalInfo: React.FC<PostModalHeadProps> = (props) => {
  return (
    <PostModalInfoBox>
      <DateViewBox>
        <PastDateBox>{props.days} days ago</PastDateBox>
        <ViewCountBox>
          {props.views}
          <AiFillEye />
        </ViewCountBox>
      </DateViewBox>
      <LikeBox>
        <AiFillHeart />
        {props.follows}
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
  const [isFollow, setIsFollow] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(
    (() => {
      if (typeof window === "undefined") return {};
      const localStorageUser = window.localStorage.getItem("user");
      if (!localStorageUser) return {};
      return JSON.parse(localStorageUser);
    })()
  );
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
  const tryChat = async () => {
    router.push({ pathname: "/chat", query: { userId: props.id } });
  };

  // const follow = async () => {
  //   await axios
  //     .post(`/follow/${props.id}`, {
  //       headers: {
  //         Authorization: `${user?.token}`,
  //       },
  //     })
  //     .then((res) => {
  //       if (!res.data.isSuccess) {
  //         throw new Error(res.data);
  //       }
  //       alert("follow 성공");
  //       console.log("follow 성공!");
  //       setIsFollow(true);
  //       return res.data;
  //     })
  //     .catch((err) => console.error(err));
  // };
  const follow = async () => {
    const response = await axios
      .post(`/follow/${props.id}`, {
        headers: {
          Authorization: `${user?.token}`,
        },
      })
      .catch((err) => err.response);

    if (response.status === 401) {
      // access token 만료
      // refresh token 전송
    }
    if (!response.data.isSuccess) {
      console.error(response.data);
      return;
    }
    alert("follow");
    console.log("follow 성공!");
    setIsFollow(true);
    return response.data;
  };

  const unFollow = async () => {
    const response = await axios
      .delete(`/follow/${props.id}`, {
        headers: {
          Authorization: `${user?.token}`,
        },
      })
      .catch((err) => err.response);

    if (response.status === 401) {
      // access token 만료
      // refresh token 전송
    }

    if (!response.data.isSuccess) {
      console.error(response.data);
    }
    alert("unfollow");
    console.log("unfollow 성공!");
    setIsFollow(false);
    return response.data;
  };
  return (
    <PostModalBox visible={props.visible}>
      <PostImage src={`${props.imageUrl}`}></PostImage>
      <PostUserName>{props.name}</PostUserName>
      <PostButtonBox>
        <PostChatButton onClick={tryChat} secondary width="250px" height="45px">
          Try Chat
        </PostChatButton>
        <PostLikeBox
          onClick={() => {
            if (!isFollow) follow();
            else unFollow();
          }}
        >
          {isFollow ? <AiFillHeart /> : <AiOutlineHeart />}
        </PostLikeBox>
      </PostButtonBox>
      <PostInfoList title="I am from" values={country} mainValue={repCountry} />
      <PostInfoList
        title="I can speak"
        values={language}
        mainValue={repLanguage}
      />
      <PostInfoList
        title="I want to speak"
        values={hopeLanguage}
        mainValue={repHopeLanguage}
      />
      <PostSocialList
        title="Contact to me"
        faceBookUrl={props.facebookUrl}
        instagramUrl={props.instagramUrl}
      />
      <PostModalContent>{props.children}</PostModalContent>
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
