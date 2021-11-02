import styled from "styled-components";
import { MouseEventHandler, useState } from "react";
import Image from "next/image";
import PostModal from "../PostModal";
import { ModalLayout } from "../../common";
import { usePost } from "../../../hooks/api/post/usePost";
import { initialPostInfo } from "../../../constants/post";
import { PostCardProps, PostModalInfoProps } from "../../../../types/post";
import { PostCardImageInfo } from "./PostCardImageInfo";
import { PostCardInfo } from "./PostCardInfo";

const PostCard: React.FC<PostCardProps> = (props) => {
  const { getPostModalData } = usePost();
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

  const handleClickPostCard: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    const data = await getPostModalData(props.id);
    setPostModalInfo((pre) => {
      return { ...pre, ...data };
    });
    setOpen((open) => !open);
  };
  const handleClickModalLayout: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const postModal = open && (
    <>
      <ModalLayout onClick={handleClickModalLayout} />
      <PostModal
        content={postModalInfo.content}
        country={postModalInfo.country}
        regDate={postModalInfo.regDate}
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
  );

  return (
    <div>
      <PostCardContainer>
        <PostCardBox onClick={handleClickPostCard}>
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
      {postModal}
    </div>
  );
};

export { PostCard };

const PostCardBox = styled.div`
  cursor: pointer;
  width: 300px;
  display: flex;
  flex-direction: column;
  height: 360px;
  max-height: 400px;
  border: 0.5px solid
    ${(props) =>
      props.theme.id === "light" ? "none" : props.theme.primaryColor};
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.5);
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

  &:hover {
    animation: kenburns-top 0.2s ease-out both;
  }

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;
const PostCardContentText = styled.textarea`
  cursor: pointer;
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
      -webkit-transform: translateY(1024px);
      transform: translateY(1024px);
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
