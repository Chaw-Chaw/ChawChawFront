import styled from "styled-components";
import { Button } from "../../common";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/router";
import axios from "axios";
import { MouseEventHandler, useContext, useState } from "react";

import { AuthContext } from "../../../store/AuthContext";

interface PostModalActive {
  id: number;
  isFollow: boolean;
}

const PostModalActive: React.FC<PostModalActive> = (props) => {
  const router = useRouter();
  const [isActiveFollow, setIsActiveFollow] = useState(props.isFollow);
  const { accessToken, grantRefresh } = useContext(AuthContext);

  const tryChat: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push({ pathname: "/chat", query: { userId: props.id } });
  };
  const follow = async () => {
    const response = await fetch(`/follow/${props.id}`, {
      method: "POST",
      headers: {
        Authorization: accessToken,
      },
    }).catch((err) => {
      console.log(err, "팔로우 실패");
    });

    console.log(response, "팔로우 결과");
    setIsActiveFollow(true);

    // if()
    //   const response = await axios
    //     .post(`/follows/${props.id}`, {
    //       headers: {
    //         Authorization: accessToken,
    //       },
    //     })
    //     .catch((err) => {
    //       console.log(err, "팔로우 에러");
    //       return err.response;
    //     });
    //   if (response.status === 401) {
    //     // access token 만료
    //     // refresh token 전송
    //     grantRefresh();
    //     return;
    //   }
    //   if (!response.data.isSuccess) {
    //     console.log(response);
    //     return;
    //   }

    //   console.log("follow 성공!");
    //   setIsActiveFollow(true);

    // };
  };

  const unFollow = async () => {
    const response = await axios
      .delete(`/follow/${props.id}`, {
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
      console.log(response, "언팔로우 실패");
      return;
    }
    console.log("unfollow 성공!");
    setIsActiveFollow(false);
  };
  return (
    <PostButtonBox>
      <PostChatButton onClick={tryChat} secondary width="250px" height="45px">
        Try Chat
      </PostChatButton>
      <PostLikeBox
        onClick={() => {
          if (!isActiveFollow) follow();
          else unFollow();
        }}
      >
        {isActiveFollow ? <AiFillHeart /> : <AiOutlineHeart />}
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
  right: 35px;
  cursor: pointer;
  svg {
    color: red;
    font-size: 45px;
  }
`;
