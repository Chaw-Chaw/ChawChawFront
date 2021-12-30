import React from "react";
import styled from "styled-components";
import { Input, ListItem } from "../common";

const MManageUserUniversity: React.FC<{ userSchool: string }> = (props) => {
  return (
    <ListItem
      title="소속대학"
      description="해당 대학 웹메일로 인증한 대학소속입니다."
    >
      <UserUniversity disabled value={props.userSchool} />
    </ListItem>
  );
};

const ManageUserUniversity = React.memo(MManageUserUniversity);
export { ManageUserUniversity };

const UserUniversity = styled(Input)`
  width: 40%;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;
