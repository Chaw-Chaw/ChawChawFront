import axios from "axios";
import { Router, useRouter } from "next/router";
import { MouseEventHandler, useContext } from "react";
import { useAlert } from "react-alert";
import styled from "styled-components";
import { AuthContext } from "../../store/AuthContext";
import { getSecureLocalStorage } from "../../utils";
import { Button, ListItem } from "../common";

const SettingUserDelete: React.FC = () => {
  const { grantRefresh, isLogin } = useContext(AuthContext);
  const message = useAlert();
  const router = useRouter();

  // 유저 삭제시 확인 메세지 alert 생성
  const deleteUser = async () => {
    const response = await axios
      .delete("/users", {
        headers: {
          Authorization: getSecureLocalStorage("accessToken"),
        },
      })
      .catch((err) => err.response);

    if (response.status == 401) {
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
      await deleteUser();
      return false;
    }
    console.log(response, "delete User 결과");

    if (!response.data.isSuccess) {
      console.log(response, "유저 삭제 실패");
      return false;
    }
    return response;
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (!isLogin) return;
    const response = await deleteUser();
    if (!response) return;
    router.push("/manage/users");
  };

  return (
    <ListItem
      title="회원탈퇴"
      description="탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다."
    >
      <UserDeleteButton onClick={handleClick}>회원 탈퇴</UserDeleteButton>
    </ListItem>
  );
};

export { SettingUserDelete };

const UserDeleteButton = styled(Button)`
  background-color: rgba(255, 107, 107, 1);
  border: none;
  border-radius: 10px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;
