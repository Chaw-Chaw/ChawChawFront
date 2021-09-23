import styled from "styled-components";
import { Button } from "../../common";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiBlock } from "react-icons/bi";
import { useRouter } from "next/router";
import axios from "axios";
import { MouseEventHandler, useContext, useState } from "react";
import { AuthContext } from "../../../store/AuthContext";
import { useAlert } from "react-alert";

interface PostModalActive {
  id: number;
  isLike: boolean;
}

const PostModalActive: React.FC<PostModalActive> = (props) => {
  const router = useRouter();
  const [isActiveLike, setIsActiveLike] = useState(props.isLike);
  const { accessToken, grantRefresh } = useContext(AuthContext);
  const message = useAlert();

  const confirmBlock: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    message.info(
      "차단하면 영구히 차단되며 차단을 해제할 수 없습니다. 신중하게 차단해주세요."
    );
  };
  const tryChat: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push({ pathname: "/chat", query: { userId: props.id } });
  };
  const like = async () => {
    const response = await fetch(`/like/${props.id}`, {
      method: "POST",
      headers: {
        Authorization: accessToken,
      },
    }).catch((err) => {
      console.log(err, "좋아요 실패");
    });

    console.log(response, "종아요 결과");
    setIsActiveLike(true);
  };

  const unLike = async () => {
    const response = await axios
      .delete(`/like/${props.id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: accessToken,
          Accept: "application/json",
        },
      })
      .catch((err) => err.response);

    if (response.status === 401) {
      // access token 만료
      // refresh token 전송
      grantRefresh();
    }
    if (!response.data.isSuccess) {
      console.log(response, "좋아요 취소 실패");
      return;
    }
    console.log("좋아요 취소 성공!");
    setIsActiveLike(false);
  };
  return (
    <PostButtonBox>
      <PostBlockBox onClick={confirmBlock}>
        <BiBlock />
      </PostBlockBox>
      <PostChatButton onClick={tryChat} secondary width="250px" height="45px">
        Try Chat
      </PostChatButton>
      <PostLikeBox
        onClick={() => {
          if (!isActiveLike) like();
          else unLike();
        }}
      >
        {isActiveLike ? <AiFillHeart /> : <AiOutlineHeart />}
      </PostLikeBox>
    </PostButtonBox>
  );
};

export { PostModalActive };

const PostChatButton = styled(Button)`
  margin: 15px auto;
  min-height: 30px;
  @media (max-width: 500px) {
    width: 150px;
  }
`;

const PostButtonBox = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const PostLikeBox = styled.div`
  position: absolute;
  width: 45px;
  right: 35px;
  cursor: pointer;
  svg {
    color: red;
    font-size: 45px;
  }
`;

const PostBlockBox = styled(PostLikeBox)`
  left: 35px;
  svg {
    color: black;
  }
`;
