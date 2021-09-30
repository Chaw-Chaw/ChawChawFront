import styled from "styled-components";
import { useContext, useState } from "react";
import Image from "next/image";
import PostModal from "../PostModal";
import { ModalLayout } from "../../common";
import axios from "axios";
import { PostModalInfoProps } from "../PostModal";
import { PostCardInfoProps, PostCardInfo } from "../PostCard/PostCardInfo";
import { DEFAULT_PROFILE_IMAGE } from "../../../constants";
import { PostCardImageInfoProps, PostCardImageInfo } from "./PostCardImageInfo";
import { AuthContext } from "../../../store/AuthContext";
import { useCookies } from "react-cookie";

interface PostCardProps extends PostCardInfoProps, PostCardImageInfoProps {
  imageUrl: string;
  id: number;
  content: string;
}

const PostCard: React.FC<PostCardProps> = (props) => {
  const initialPostInfo = {
    content: "",
    country: [],
    days: "",
    facebookUrl: "",
    likes: 0,
    hopeLanguage: [],
    id: 0,
    imageUrl: DEFAULT_PROFILE_IMAGE,
    instagramUrl: "",
    language: [],
    name: "",
    repCountry: "",
    repHopeLanguage: "",
    repLanguage: "",
    views: 0,
    isLike: false,
  };
  const postCardContentArr = props.content.split("\n");
  const postCardContentTmp =
    postCardContentArr.length > 11
      ? postCardContentArr.slice(0, 9).concat(["..."]).join("\n")
      : postCardContentArr.join("\n");
  const postCardContent =
    postCardContentTmp.length > 220
      ? postCardContentTmp.substring(0, 150) + "..."
      : postCardContentTmp;

  const [open, setOpen] = useState(false);
  const [postModalInfo, setPostModalInfo] =
    useState<PostModalInfoProps>(initialPostInfo);
  const { grantRefresh } = useContext(AuthContext);
  const [cookies] = useCookies(["accessToken"]);

  const handleModal = async () => {
    const response = await axios
      .get(`/users/${props.id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: cookies.accessToken,
          Accept: "application/json",
        },
      })
      .catch((err) => err.response);
    if (response.status === 401) {
      // access token 만료
      // refresh token 전송
      grantRefresh();
      return;
    }
    console.log(response, "PostModal data");

    if (!response.data.isSuccess) {
      alert(`${props.id} 데이터 조회 실패`);
      console.error(response.data);
      return;
    }
    setPostModalInfo((pre) => {
      return { ...pre, ...response.data.data };
    });
    setOpen((open) => !open);
  };

  return (
    <div>
      <PostCardContainer>
        <PostCardBox
          onClick={(e) => {
            e.preventDefault();
            handleModal();
          }}
        >
          <PostImageBox>
            <Image
              src={`${props.imageUrl}`}
              alt="포스팅 프로필 이미지"
              width="100px"
              height="100px"
              className="post-image"
              objectFit="cover"
            />
            <PostCardImageInfo
              name={props.name}
              repCountry={props.repCountry}
              repLanguage={props.repLanguage}
              repHopeLanguage={props.repHopeLanguage}
            />
          </PostImageBox>
          <PostCardContent>
            <PostCardContentText disabled value={postCardContent} />
          </PostCardContent>
          <PostCardInfo
            pastDate={props.pastDate}
            viewCount={props.viewCount}
            likeCount={props.likeCount}
          />
        </PostCardBox>
      </PostCardContainer>
      {open ? (
        <>
          <ModalLayout
            onClick={() => {
              setOpen(false);
            }}
          />
          <PostModal
            content={postModalInfo.content}
            country={postModalInfo.country}
            days={postModalInfo.days}
            facebookUrl={postModalInfo.facebookUrl}
            likes={postModalInfo.likes}
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
            isLike={postModalInfo.isLike}
          >
            {props.children}
          </PostModal>
        </>
      ) : null}
    </div>
  );
};

export { PostCard };

const PostCardBox = styled.div`
  /* margin: 0px 15px 20px 15px; */
  width: 300px;
  display: flex;
  flex-direction: column;
  height: 360px;
  max-height: 400px;
  border: 0.5px solid
    ${(props) =>
      props.theme.id === "light" ? "none" : props.theme.primaryColor};
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
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;
const PostCardContentText = styled.textarea`
  width: 100%;
  color: ${(props) => (props.theme.id === "light" ? "black" : "white")};
  height: 220px;
  font-size: 1rem;
  resize: none;
  box-sizing: border-box;
  border: none;
  font-family: "Source Sans Pro";
  background-color: ${(props) => props.theme.bodyBackgroundColor};
`;
const PostCardContent = styled.div`
  width: 100%;
  padding: 5px 10px;
  box-sizing: border-box;
  height: 220px;
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
`;

const PostCardContainer = styled.div`
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
`;
