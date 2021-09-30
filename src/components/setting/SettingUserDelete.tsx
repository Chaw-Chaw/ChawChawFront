import axios from "axios";
import { MouseEventHandler, useContext } from "react";
import { useAlert } from "react-alert";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { AuthContext } from "../../store/AuthContext";
import { Button, ListItem } from "../common";

const SettingUserDelete: React.FC = () => {
  const { grantRefresh, isLogin } = useContext(AuthContext);
  const [cookies] = useCookies(["accessToken"]);
  // 유저 삭제시 확인 메세지 alert 생성
  const message = useAlert();
  const deleteUser = async () => {
    const response = await axios
      .delete("/users", {
        headers: {
          Authorization: cookies.accessToken,
        },
      })
      .catch((err) => err.response);

    if (response.status == 401) {
      grantRefresh();
      return;
    }
    console.log(response, "delete User 결과");

    if (!response.data.isSuccess) {
      alert(`유저 삭제 실패`);
      return;
    }
  };

  const deleteUserButtonHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!isLogin) return;

    deleteUser();
  };
  return (
    <ListItem
      title="회원탈퇴"
      description="탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다."
    >
      <UserDeleteButton onClick={deleteUserButtonHandler}>
        회원 탈퇴
      </UserDeleteButton>
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
