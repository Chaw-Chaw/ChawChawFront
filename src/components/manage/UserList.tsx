import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { pagenationInfoType, usersType } from "../../pages/manage/users";
import { UserListItem } from "./UserListItem";

const UserList: React.FC<{
  usersList: usersType[];
  pagenationInfo: pagenationInfoType;
  selectedPageNumber: number;
  setSelectedPageNumber: Dispatch<SetStateAction<number>>;
}> = (props) => {
  return (
    <UserListContainer>
      <UserListBox>
        <UserListHeaderBox>
          <UserListHeaderItem width="6%">순번</UserListHeaderItem>
          <UserListHeaderItem width="13%">학교</UserListHeaderItem>
          <UserListHeaderItem width="6%">이름</UserListHeaderItem>
          <UserListHeaderItem width="13%">이메일</UserListHeaderItem>
          <UserListHeaderItem width="12%">나라</UserListHeaderItem>
          <UserListHeaderItem width="13%">대표언어</UserListHeaderItem>
          <UserListHeaderItem width="13%">대표희망언어</UserListHeaderItem>
          <UserListHeaderItem width="6%">조회수</UserListHeaderItem>
          <UserListHeaderItem width="6%">좋아요</UserListHeaderItem>
          <UserListHeaderItem width="12%">가입날짜</UserListHeaderItem>
        </UserListHeaderBox>
        {props.usersList.length > 0
          ? props.usersList.map((item, index) => {
              return (
                <UserListItem
                  key={index}
                  index={index}
                  userItem={item}
                  currentPage={props.pagenationInfo.curPage}
                />
              );
            })
          : null}
      </UserListBox>
    </UserListContainer>
  );
};

export { UserList };

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const UserListBox = styled.div`
  width: 100%;
  height: 580px;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.primaryColor};
`;

const UserListHeaderBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-bottom: 1px solid ${(props) => props.theme.primaryColor};
`;

const UserListHeaderItem = styled.div<{ width: string }>`
  text-align: center;
  width: ${(props) => props.width};
`;
