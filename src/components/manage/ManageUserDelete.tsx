import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import styled from "styled-components";
import { Button, ListItem } from "../common";
import { useDeleteUser } from "../../hooks/api/account/useDeleteUser";
import { MANAGE_MAIN_PAGE_URL } from "../../constants";

const ManageUserDelete: React.FC<{ userId: number }> = (props) => {
  const { deleteManageUser } = useDeleteUser();
  const router = useRouter();
  // 유저 삭제시 확인 메세지 alert 생성

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    await deleteManageUser(props.userId);
    // message.success("유저삭제성공!", {
    //   onClose: () => {
    //     router.push(MANAGE_MAIN_PAGE_URL);
    //   },
    // });
  };
  return (
    <>
      <ListItem
        title="회원삭제"
        description="삭제시 유저가 작성한 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다."
      >
        <UserDeleteButton onClick={handleClick}>회원 삭제</UserDeleteButton>
      </ListItem>
    </>
  );
};

export { ManageUserDelete };

const UserDeleteButton = styled(Button)`
  background-color: rgba(255, 107, 107, 1);
  border: none;
  border-radius: 10px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;
