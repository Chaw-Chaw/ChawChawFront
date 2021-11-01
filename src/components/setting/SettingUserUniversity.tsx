import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../store/AuthContext";
import { Input, ListItem } from "../common";

const SettingUserUniversity: React.FC = () => {
  const { user } = useContext(AuthContext);
  return (
    <ListItem
      title="소속대학"
      description="해당 대학 웹메일로 인증한 대학소속입니다."
    >
      <UserUniversity disabled value={user.school} />
    </ListItem>
  );
};

export { SettingUserUniversity };

const UserUniversity = styled(Input)`
  width: 40%;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;
