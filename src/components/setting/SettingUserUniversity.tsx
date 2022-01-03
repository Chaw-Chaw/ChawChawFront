import React, { useContext } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/redux";
import { Input, ListItem } from "../common";

const MSettingUserUniversity: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <ListItem
      title="소속대학"
      description="해당 대학 웹메일로 인증한 대학소속입니다."
    >
      <UserUniversity disabled value={user.school} />
    </ListItem>
  );
};

const SettingUserUniversity = React.memo(MSettingUserUniversity);
export { SettingUserUniversity };

const UserUniversity = styled(Input)`
  width: 40%;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;
