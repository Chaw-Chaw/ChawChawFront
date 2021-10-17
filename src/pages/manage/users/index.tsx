import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ManageLayout } from "../../../components/manage/ManageLayout";
import {
  UserOrder,
  orderOptions,
  sortOptions,
} from "../../../components/manage/UserOrder";
import { UserList } from "../../../components/manage/UserList";
import { PostSearch as UserSearch } from "../../../components/post/PostSearch";
import axios from "axios";
import { LanguageLocale, Pagenation } from "../../../components/common";
import { getSecureLocalStorage } from "../../../utils";
import { AuthContext } from "../../../store/AuthContext";
import { useAlert } from "react-alert";

interface usersType {
  id: number; // 이거 순번 아니고 그냥 userId
  name: string;
  school: string;
  email: string;
  repCountry: string;
  repLanguage: string;
  repHopeLanguage: string;
  likes: number;
  views: string;
  regDate: string;
}

interface pagenationInfoType {
  totalCnt: number;
  startPage: number;
  endPage: number;
  curPage: number;
  isNext: boolean;
  isPrevious: boolean;
}

export default function ManageUser() {
  const { grantRefresh } = useContext(AuthContext);
  const message = useAlert();
  const [searchInfo, setSearchInfo] = useState<string[]>([
    "선택언어",
    "선택희망언어",
    "나라",
    "학교",
    "정렬",
    "순서",
  ]);
  const [usersList, setUsersList] = useState<usersType[]>([]);
  const [pagenationInfo, setPagenationInfo] = useState<pagenationInfoType>({
    totalCnt: 1,
    startPage: 1,
    endPage: 1,
    curPage: 0,
    isNext: false,
    isPrevious: false,
  });
  const [selectedPageNumber, setSelectedPageNumber] = useState<number>(1);
  const searchName = useRef("");

  const getUsersList = async () => {
    const searchCondition = {
      name: searchName.current,
      language: LanguageLocale[searchInfo[0]] || "",
      hopeLanguage: LanguageLocale[searchInfo[1]] || "",
      country: searchInfo[2] === "나라" ? "" : searchInfo[2],
      school: searchInfo[3] === "학교" ? "" : searchInfo[3],
      sort: sortOptions[searchInfo[4]] || "",
      order: orderOptions[searchInfo[5]] || "",
      pageNo: selectedPageNumber,
    };
    const response = await axios
      .get("/admin/users", {
        params: searchCondition,
        headers: {
          Authorization: getSecureLocalStorage("accessToken"),
        },
      })
      .catch((err) => err.response);

    console.log(response, "userList");
    if (response.status === 401) {
      grantRefresh();
      return;
    }

    if (!response.data.isSuccess) {
      message.info("조회 결과가 없습니다.");
      return;
    }

    setUsersList(response.data.data.contents);
    setPagenationInfo({
      totalCnt: response.data.data.totalCnt,
      startPage: response.data.data.startPage,
      endPage: response.data.data.endPage,
      curPage: response.data.data.curPage,
      isNext: response.data.data.isNext,
      isPrevious: response.data.data.isPrevious,
    });
  };

  const userSearchHandler = async (inputs: string) => {
    searchName.current = inputs;
    await getUsersList();
  };

  useEffect(() => {
    getUsersList();
  }, [selectedPageNumber]);

  return (
    <ManageLayout>
      <Container>
        <UserSearch searchHandler={userSearchHandler} />
        <UserOrder searchInfo={searchInfo} setSearchInfo={setSearchInfo} />
        <UserList
          usersList={usersList}
          pagenationInfo={pagenationInfo}
          selectedPageNumber={selectedPageNumber}
          setSelectedPageNumber={setSelectedPageNumber}
        />
        <Pagenation
          pagenationInfo={pagenationInfo}
          selectedPageNumber={selectedPageNumber}
          setSelectedPageNumber={setSelectedPageNumber}
        />
      </Container>
    </ManageLayout>
  );
}

export type { usersType, pagenationInfoType };

const Container = styled.div`
  margin: 40px auto 0px auto;
  width: calc(100% - 350px);
  box-sizing: border-box;
`;
