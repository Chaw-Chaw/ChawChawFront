import styled from "styled-components";
import { Button } from "../../common";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/router";
import axios from "axios";
import { MouseEventHandler, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../../store/AuthContext";

interface PostModalActive {
  id: number;
  isFollow: boolean;
}

const PostModalActive: React.FC<PostModalActive> = (props) => {
  const router = useRouter();
  const [isActiveFollow, setIsActiveFollow] = useState(props.isFollow);
  const { grantRefresh } = useContext(AuthContext);
  const [cookies] = useCookies(["accessToken"]);
  const accessToken = cookies.accessToken;
  const tryChat: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push({ pathname: "/chat", query: { userId: props.id } });
  };
  const follow = async () => {
    const response = await axios
      .post(`/follow/${props.id}`, {
        headers: {
          Authorization: accessToken,
          Accept: "*/*",
        },
      })
      .catch((err) => {
        console.log(err, "팔로우 에러");
        return err.response;
      });

    if (response.status === 401) {
      // access token 만료
      // refresh token 전송
      grantRefresh();
      return;
    }
    if (!response.data.isSuccess) {
      console.error(response.data);
      return;
    }
    alert("follow");
    console.log("follow 성공!");
    setIsActiveFollow(true);
    return response.data;
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
      console.error(response.data);
    }
    console.log("unfollow 성공!");
    setIsActiveFollow(false);
    return response.data;
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
