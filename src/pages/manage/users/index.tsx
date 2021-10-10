import { useState } from "react";
import styled from "styled-components";
import { ManageLayout } from "../../../components/manage/ManageLayout";
import { UserOrder } from "../../../components/manage/UserOrder";
import { PostSearch as UserSearch } from "../../../components/post/PostSearch";

export default function ManageUser() {
  const [searchInfo, setSearchInfo] = useState<string[]>([
    "언어",
    "희망언어",
    "나라",
    "학교",
    "정렬",
    "순서",
  ]);

  const userSearchHandler = () => {};
  return (
    <ManageLayout>
      <Container>
        <UserSearch searchHandler={userSearchHandler} />
        <UserOrder searchInfo={searchInfo} setSearchInfo={setSearchInfo} />
      </Container>
    </ManageLayout>
  );
}

const Container = styled.div`
  margin: 40px 40px;
  width: calc(100% - 300px);
`;
