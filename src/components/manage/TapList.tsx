import { MouseEventHandler, useContext } from "react";
import styled from "styled-components";
import { useLogin } from "../../hooks/api/account/useLogin";
import { Button } from "../common";
import { ToggleItem } from "./ToggleItem";
import { ToggleListItem } from "./ToggleListItem";

const TapList: React.FC = () => {
  const { logout } = useLogin();
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    logout();
  };
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
          type="RANK_SCHOOL"
          link="/manage/statistics"
        />
        <ToggleListItem
          title="희망 언어 순위"
          type="HOPE_LANGUAGE"
          link="/manage/statistics"
        />
        <ToggleListItem
          title="할 수 있는 언어 순위"
          type="LANGUAGE"
          link="/manage/statistics"
        />
        <ToggleListItem
          title="인기 검색 언어 순위"
          type="SEARCH_LANGUAGE"
          link="/manage/statistics"
        />
      </ToggleItem>
      <LogoutButton onClick={handleClick}>로그아웃</LogoutButton>
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
