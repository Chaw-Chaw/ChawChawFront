import { useRouter } from "next/router";
import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { Button, ListItem } from "../common";
import { useDeleteUser } from "../../hooks/api/account/useDeleteUser";
import {
  CONFIRM_PUSH_MANAGE_MAINPAGE,
  MANAGE_MAIN_PAGE_URL,
  SUCCESS_ALERT,
  SUCCESS_DELETE_USER_MSG,
} from "../../constants";
import { useAppDispatch } from "../../hooks/redux";
import { deleteManagerUser } from "../../store/actions/manageActions";
import { alertActions, asyncErrorHandle } from "../../store/alertSlice";

const MManageUserDelete: React.FC<{ userId: number }> = (props) => {
  const dispatch = useAppDispatch();
  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      e.preventDefault();
      await dispatch(deleteManagerUser(props.userId));
      dispatch(
        alertActions.updateAlert({
          name: SUCCESS_ALERT,
          message: SUCCESS_DELETE_USER_MSG,
          confirmFuncName: CONFIRM_PUSH_MANAGE_MAINPAGE,
        })
      );
    } catch (error) {
      dispatch(asyncErrorHandle(error));
    }
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

const ManageUserDelete = React.memo(MManageUserDelete);
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
