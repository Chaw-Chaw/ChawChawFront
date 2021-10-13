import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../store/AuthContext";
import { Button } from "../common";
import { ToggleItem } from "./ToggleItem";
import { ToggleListItem } from "./ToggleListItem";

const TapList: React.FC = () => {
  const { logout } = useContext(AuthContext);
  return (
    <TapContainter>
      <ToggleItem title="회원 정보 관리">
        <ToggleListItem
          title="회원 정보 검색"
          type="userSearch"
          link="/manage/users"
        />
      </ToggleItem>
      <ToggleItem title="통계">
        <ToggleListItem
          title="학교 활성도 순위"
          type="rankSchool"
          link="/manage/statistics"
        />
        <ToggleListItem
          title="희망 언어 순위"
          type="hopeLanguage"
          link="/manage/statistics"
        />
        <ToggleListItem
          title="할 수 있는 언어 순위"
          type="language"
          link="/manage/statistics"
        />
        <ToggleListItem
          title="인기 검색 언어 순위"
          type="searchLanguage"
          link="/manage/statistics"
        />
      </ToggleItem>
      <LogoutButton onClick={logout}>로그아웃</LogoutButton>
    </TapContainter>
  );
};

export { TapList };

const TapContainter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const LogoutButton = styled(Button)`
  margin-top: 40px;
  width: 240px;
  height: 40px;
  border-radius: 20px;
  background-color: white;
  color: ${(props) => props.theme.primaryColor};
`;
