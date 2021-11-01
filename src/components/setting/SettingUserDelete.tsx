import { MouseEventHandler, useState } from "react";
import styled from "styled-components";
import { Button, ListItem } from "../common";
import { ContfirmUserDelete } from "./ConfirmUserDelete";

const SettingUserDelete: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <ListItem
        title="회원탈퇴"
        description="탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다."
      >
        <UserDeleteButton onClick={handleClick}>회원 탈퇴</UserDeleteButton>
      </ListItem>
      {open && <ContfirmUserDelete setOpen={setOpen} />}
    </>
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
