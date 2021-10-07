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
import { useCookies } from "react-cookie";

interface PostModalActive {
  id: number;
  isLike: boolean;
}

const PostModalActive: React.FC<PostModalActive> = (props) => {
  const router = useRouter();
  const [cookies] = useCookies(["accessToken"]);
  const { grantRefresh, user } = useContext(AuthContext);
  const { blockUser, unblockUser } = useContext(ChatContext);
  const [isActiveLike, setIsActiveLike] = useState(props.isLike);
  const [isBlock, setIsBlock] = useState(user.blockIds?.includes(props.id));
  const message = useAlert();

  const tryChat: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (user.blockIds?.includes(props.id)) {
      message.info("차단된 유저 입니다.");
      return;
    }
    router.push({ pathname: "/chat", query: { userId: props.id } });
  };

  const like = async () => {
    const response = await axios
      .post(
        "/like",
        { userId: props.id },
        {
          headers: {
            Authorization: cookies.accessToken,
          },
        }
      )
      .catch((err) => {
        console.log(err, "좋아요 실패");
        return err.response;
      });

    if (response.status === 401) {
      // access token 만료
      // refresh token 전송
      grantRefresh();
      return;
    }

    if (response.data.responseMessage === "차단한 또는 차단된 유저") {
      message.error("유저로 부터 차단되어 좋아요를 할 수 없습니다.");
    }
    if (!response.data.isSuccess) {
      console.log(response, "좋아요 실패");
      return;
    }

    return true;
  };

  const unLike = async () => {
    const response = await axios
      .delete("/like", {
        data: {
          userId: props.id,
        },
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
    if (!response.data.isSuccess) {
      console.log(response, "좋아요 취소 실패");
      return;
    }
    console.log("좋아요 취소 성공!");
    return true;
  };

  const unblockButtonHandler: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    const result = await unblockUser(props.id);
    if (result) setIsBlock(false);
  };
  const blockButtonHandler: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    // message.info(
    //   "차단하면 더이상 차단한 상대방의 메세지와 알람을 받을 수 없습니다. 차단하시겠습니까?"
    // );
    const result = await blockUser(props.id);
    if (result) setIsBlock(true);
  };

  const unLikeButtonHandler: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    const result = await unLike();
    if (result) setIsActiveLike(false);
  };

  const likeButtonHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const result = await like();
    if (result) setIsActiveLike(true);
  };

  useEffect(() => {
    const blockConfirm = user.blockIds?.includes(props.id);
    setIsBlock(Boolean(blockConfirm));
  }, [user]);

  return (
    <PostButtonBox>
      <PostChatButton onClick={tryChat} secondary width="250px" height="45px">
        Try Chat
      </PostChatButton>
      <PostActionBox>
        <PostLikeBox>
          {isActiveLike ? (
            <UnActionButton onClick={unLikeButtonHandler}>
              <AiFillHeart />
              취소
            </UnActionButton>
          ) : (
            <ActionButton onClick={likeButtonHandler}>
              <AiOutlineHeart />
              좋아요
            </ActionButton>
          )}
        </PostLikeBox>
        <PostBlockBox>
          {isBlock ? (
            <UnActionButton onClick={unblockButtonHandler}>
              <CgUnblock />
              차단해제
            </UnActionButton>
          ) : (
            <ActionButton onClick={blockButtonHandler}>
              <CgBlock />
              차단
            </ActionButton>
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
  margin-right: 10px;
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
  @media (max-width: 500px) {
  }
`;

const PostBlockBox = styled(PostLikeBox)`
  margin: 0px;
`;

const PostActionBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.secondaryColor};
  padding: 10px 20px;
  box-sizing: border-box;
  @media (max-width: 500px) {
    justify-content: center;
  }
`;

const UnActionButton = styled(Button)`
  border-radius: 10px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: initial;
  svg {
    margin-right: 5px;
  }
`;

const ActionButton = styled(UnActionButton)`
  background-color: white;
  border: 1px solid ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.primaryColor};
`;
