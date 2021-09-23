import styled from "styled-components";
import { Button } from "../../common";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CgBlock, CgUnblock } from "react-icons/cg";
import { useRouter } from "next/router";
import axios from "axios";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../store/AuthContext";
import { useAlert } from "react-alert";
import { ChatContext } from "../../../store/ChatContext";

interface PostModalActive {
  id: number;
  isLike: boolean;
}

const PostModalActive: React.FC<PostModalActive> = (props) => {
  const router = useRouter();
  const { accessToken, grantRefresh, user } = useContext(AuthContext);
  const { blockUser, unBlockUser } = useContext(ChatContext);
  const [isActiveLike, setIsActiveLike] = useState(props.isLike);
  const message = useAlert();
  const [isBlock, setIsBlock] = useState(false);

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

  const unBlockButtonHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    unBlockUser(props.id);
    setIsBlock(false);
  };
  const blockButtonHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    // message.info(
    //   "차단하면 더이상 차단한 상대방의 메세지와 알람을 받을 수 없습니다. 차단하시겠습니까?"
    // );
    blockUser(props.id);
    setIsBlock(true);
  };

  useEffect(() => {
    console.log(user, "user");
    const blockConfirm = user.blockIds?.includes(props.id);
    setIsBlock(Boolean(blockConfirm));
  }, [user]);

  return (
    <PostButtonBox>
      <PostChatButton onClick={tryChat} secondary width="250px" height="45px">
        Try Chat
      </PostChatButton>
      <PostActionBox>
        <PostLikeBox
          onClick={() => {
            if (!isActiveLike) like();
            else unLike();
          }}
        >
          {isActiveLike ? <AiFillHeart /> : <AiOutlineHeart />}
        </PostLikeBox>
        <PostBlockBox>
          {isBlock ? (
            <UnBlockButton onClick={unBlockButtonHandler}>
              <CgUnblock />
              차단해제
            </UnBlockButton>
          ) : (
            <BlockButton onClick={blockButtonHandler}>
              <CgBlock />
              차단
            </BlockButton>
          )}
        </PostBlockBox>
      </PostActionBox>
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
  flex-direction: column;
`;

const PostLikeBox = styled.div`
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
`;

const PostBlockBox = styled(PostLikeBox)``;

const PostActionBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.secondaryColor};

  padding: 10px 20px;
  box-sizing: border-box;
`;

const UnBlockButton = styled(Button)`
  border-radius: 10px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-right: 5px;
  }
`;

const BlockButton = styled(UnBlockButton)`
  background-color: white;
  border: 1px solid ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.primaryColor};
`;

const LikeButton = styled(UnBlockButton)`
  /* background-color: ; */
`;
