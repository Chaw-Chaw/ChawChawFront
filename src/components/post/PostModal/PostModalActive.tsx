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
import { getSecureLocalStorage } from "../../../utils";

interface PostModalActive {
  id: number;
  isLike: boolean;
}

const PostModalActive: React.FC<PostModalActive> = (props) => {
  const router = useRouter();
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
            Authorization: getSecureLocalStorage("accessToken"),
          },
        }
      )
      .catch((err) => {
        console.log(err, "좋아요 실패");
        return err.response;
      });

    if (response.status === 401) {
      if (response.data.responseMessage === "다른 곳에서 접속함") {
        message.error(
          "현재 같은 아이디로 다른 곳에서 접속 중 입니다. 계속 이용하시려면 다시 로그인 해주세요.",
          {
            onClose: () => {
              window.localStorage.clear();
              window.location.href = "/account/login";
            },
          }
        );
      }
      // access token 만료
      // refresh token 전송
      await grantRefresh();
      await like();
      return;
    }

    if (response.data.responseMessage === "차단한 또는 차단된 유저") {
      message.info("유저로 부터 차단되어 좋아요를 할 수 없습니다.");
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
          Authorization: getSecureLocalStorage("accessToken"),
          Accept: "application/json",
        },
      })
      .catch((err) => err.response);

    if (response.status === 401) {
      if (response.data.responseMessage === "다른 곳에서 접속함") {
        message.error(
          "현재 같은 아이디로 다른 곳에서 접속 중 입니다. 계속 이용하시려면 다시 로그인 해주세요.",
          {
            onClose: () => {
              window.localStorage.clear();
              window.location.href = "/account/login";
            },
          }
        );
      }
      await grantRefresh();
      await unLike();
      // access token 만료
      // refresh token 전송
      return;
    }
    if (!response.data.isSuccess) {
      console.log(response, "좋아요 취소 실패");
      return;
    }

    return true;
  };

  const handleClickUnBlock: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    const result = await unblockUser(props.id);
    if (!result) return;
    setIsBlock(false);
  };
  const handleClickBlock: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    // message.info(
    //   "차단하면 더이상 차단한 상대방의 메세지와 알람을 받을 수 없습니다. 차단하시겠습니까?"
    // );
    const result = await blockUser(props.id);
    if (!result) return;
    setIsBlock(true);
  };

  const handleClickUnLike: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const result = await unLike();
    if (!result) return;
    setIsActiveLike(false);
  };

  const handleClickLike: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const result = await like();
    if (!result) return;
    setIsActiveLike(true);
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
            <UnActionButton onClick={handleClickUnLike}>
              <AiFillHeart />
              취소
            </UnActionButton>
          ) : (
            <ActionButton onClick={handleClickLike}>
              <AiOutlineHeart />
              좋아요
            </ActionButton>
          )}
        </PostLikeBox>
        <PostBlockBox>
          {isBlock ? (
            <UnActionButton onClick={handleClickUnBlock}>
              <CgUnblock />
              차단해제
            </UnActionButton>
          ) : (
            <ActionButton onClick={handleClickBlock}>
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
  border: 1px solid ${(props) => props.theme.primaryColor};
  @media (max-width: 500px) {
    width: 150px;
  }
  transition: background-color 0.5s;
  :hover {
    background-color: ${(props) => props.theme.primaryColor};
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
  transition: background-color 0.5s;
  :hover {
    background-color: ${(props) => props.theme.primaryColor};
  }
`;

const ActionButton = styled(UnActionButton)`
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  border: 1px solid ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.primaryColor};
`;
