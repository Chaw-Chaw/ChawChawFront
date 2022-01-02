import styled from "styled-components";
import { Button } from "../../common";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CgBlock, CgUnblock } from "react-icons/cg";
import Router, { useRouter } from "next/router";
import React, {
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CHAT_PAGE_URL,
  INFO_ALERT,
  INFO_BLOCKUSER_MSG,
} from "../../../constants";
import { useLike } from "../../../hooks/api/useLike";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { alertActions, asyncErrorHandle } from "../../../store/alertSlice";
import {
  blockUser,
  like,
  unBlockUser,
  unLike,
} from "../../../store/actions/postActions";
import { PostModalActiveProps } from "../../../types/post";

const MPostModalActive: React.FC<PostModalActiveProps> = (props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [isActiveLike, setIsActiveLike] = useState(props.isLike);
  const isBlockId = user.blockIds?.includes(props.id);
  const [isBlock, setIsBlock] = useState(isBlockId);

  const handleClickTryChat: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (isBlockId) {
        dispatch(
          alertActions.updateAlert({
            name: INFO_ALERT,
            message: INFO_BLOCKUSER_MSG,
          })
        );
        return;
      }
      Router.push({ pathname: CHAT_PAGE_URL, query: { userId: props.id } });
    },
    [dispatch, props.id, isBlockId]
  );

  const handleClickUnBlock: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    try {
      e.preventDefault();
      await dispatch(unBlockUser(props.id));
      setIsBlock(false);
    } catch (error) {
      dispatch(asyncErrorHandle(error));
    }
  };

  const handleClickBlock: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      e.preventDefault();
      await dispatch(blockUser(props.id));
      setIsBlock(true);
    } catch (error) {
      dispatch(asyncErrorHandle(error));
    }
  };

  const handleClickUnLike: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      e.preventDefault();
      await dispatch(unLike(props.id));
      setIsActiveLike(false);
    } catch (error) {
      dispatch(asyncErrorHandle(error));
    }
  };

  const handleClickLike: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      e.preventDefault();
      await dispatch(like(props.id));
      setIsActiveLike(true);
    } catch (error) {
      dispatch(asyncErrorHandle(error));
    }
  };

  useEffect(() => {
    setIsBlock(Boolean(isBlockId));
  }, [isBlockId]);

  const likeButton = isActiveLike ? (
    <UnActionButton onClick={handleClickUnLike}>
      <AiFillHeart />
      취소
    </UnActionButton>
  ) : (
    <ActionButton onClick={handleClickLike}>
      <AiOutlineHeart />
      좋아요
    </ActionButton>
  );

  const blockButton = isBlock ? (
    <UnActionButton onClick={handleClickUnBlock}>
      <CgUnblock />
      차단해제
    </UnActionButton>
  ) : (
    <ActionButton onClick={handleClickBlock}>
      <CgBlock />
      차단
    </ActionButton>
  );

  return (
    <PostButtonBox>
      <PostChatButton
        onClick={handleClickTryChat}
        secondary
        width="250px"
        height="45px"
      >
        Try Chat
      </PostChatButton>
      <PostActionBox>
        <PostLikeBox>{likeButton}</PostLikeBox>
        <PostBlockBox>{blockButton}</PostBlockBox>
      </PostActionBox>
    </PostButtonBox>
  );
};

const PostModalActive = React.memo(MPostModalActive);
export { PostModalActive };

const PostChatButton = styled(Button)`
  margin: 15px auto;
  min-height: 30px;
  border: 1px solid ${(props) => props.theme.primaryColor};
  @media (max-width: 500px) {
    width: 150px;
  }
  transition: background-color 0.5s;
  &:hover {
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
  &:hover {
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
  &:hover {
    background-color: ${(props) => props.theme.primaryColor};
  }
`;

const ActionButton = styled(UnActionButton)`
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  border: 1px solid ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.primaryColor};
`;
