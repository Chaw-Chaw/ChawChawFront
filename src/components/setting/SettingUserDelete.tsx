import React, { MouseEventHandler, useState } from "react";
import styled from "styled-components";
import {
  CONFIRM_DELETE_USER,
  SELECT_TYPE,
  WARNING_ALERT,
  WARNING_USER_DELETE_MSG,
} from "../../constants";
import { useAppDispatch } from "../../hooks/redux";
import { alertActions } from "../../store/alertSlice";
import { Button, ListItem } from "../common";

const MSettingUserDelete: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    dispatch(
      alertActions.updateAlert({
        name: WARNING_ALERT,
        message: WARNING_USER_DELETE_MSG,
        type: SELECT_TYPE,
        confirmFuncName: CONFIRM_DELETE_USER,
      })
    );
  };

  return (
    <>
      <ListItem
        title="회원탈퇴"
        description="탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다."
      >
        <UserDeleteButton onClick={handleClick}>회원 탈퇴</UserDeleteButton>
      </ListItem>
    </>
  );
};

const SettingUserDelete = React.memo(MSettingUserDelete);
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
