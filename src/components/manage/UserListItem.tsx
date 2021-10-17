import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import styled from "styled-components";
import { usersType } from "../../pages/manage/users";
import { LocaleLanguage } from "../common";

const UserListItem: React.FC<{
  index: number;
  userItem: usersType;
  currentPage: number;
}> = (props) => {
  const router = useRouter();
  const ranking = (props.currentPage - 1) * 10 + props.index + 1;
  const language = LocaleLanguage[props.userItem.repLanguage];
  const hopeLanguage = LocaleLanguage[props.userItem.repHopeLanguage];
  const joinDate = props.userItem.regDate.substring(2, 10);

  const moveDetailPageHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/manage/users/detail",
      query: { userId: props.userItem.id, userSchool: props.userItem.school },
    });
  };

  return (
    <UserListItemBox last={props.index === 9} onClick={moveDetailPageHandler}>
      <UserListAtom width="6%">{ranking}</UserListAtom>
      <UserListAtom width="13%">{props.userItem.school}</UserListAtom>
      <UserListAtom width="6%">{props.userItem.name}</UserListAtom>
      <UserListAtom width="13%">{props.userItem.email}</UserListAtom>
      <UserListAtom width="12%">{props.userItem.repCountry}</UserListAtom>
      <UserListAtom width="13%">{language}</UserListAtom>
      <UserListAtom width="13%">{hopeLanguage}</UserListAtom>
      <UserListAtom width="6%">{props.userItem.views}</UserListAtom>
      <UserListAtom width="6%">{props.userItem.likes}</UserListAtom>
      <UserListAtom width="12%">{joinDate}</UserListAtom>
    </UserListItemBox>
  );
};

export { UserListItem };

const UserListItemBox = styled.div<{ last: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 53px;
  box-sizing: border-box;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.last ? "none" : `1px solid ${props.theme.primaryColor}`};
`;

const UserListAtom = styled.div<{ width: string }>`
  text-align: center;
  width: ${(props) => props.width};
  font-size: 0.9rem;
  word-wrap: break-word;
  box-sizing: border-box;
`;
