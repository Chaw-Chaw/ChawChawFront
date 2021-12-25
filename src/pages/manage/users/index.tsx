import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ManageLayout } from "../../../components/manage/ManageLayout";
import { UserOrder } from "../../../components/manage/UserOrder";
import { UserList } from "../../../components/manage/UserList";
import { PostSearch as UserSearch } from "../../../components/post/PostSearch";
import { LanguageLocale, Pagenation } from "../../../components/common";
import { orderOptions, sortOptions } from "../../../constants/order";
import { PagenationInfoType, UserListItemType } from "../../../types/manage";
import { useManage } from "../../../hooks/api/account/manage/useManage";
import { AuthContext } from "../../../store/AuthContext";

export default function ManageUser() {
  const { user, isLogin } = useContext(AuthContext);
  const { takeUserList } = useManage();
  const [isLoading, setIsLoading] = useState(true);
  const [searchInfo, setSearchInfo] = useState<string[]>([
    "선택언어",
    "선택희망언어",
    "나라",
    "학교",
    "정렬",
    "순서",
  ]);
  const [usersList, setUsersList] = useState<UserListItemType[]>([]);
  const [pagenationInfo, setPagenationInfo] = useState<PagenationInfoType>({
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
    setIsLoading(true);
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

    try {
      const data = await takeUserList(searchCondition);
      setUsersList(data.contents);
      if (data.contents.length === 0) {
        // message.info("조회 결과가 없습니다.");
        setIsLoading(true);
        return;
      }
      setPagenationInfo({
        totalCnt: data.totalCnt,
        startPage: data.startPage,
        endPage: data.endPage,
        curPage: data.curPage,
        isNext: data.isNext,
        isPrevious: data.isPrevious,
      });

      setIsLoading(false);
    } catch {
      return;
    }
  };

  const userSearchHandler = async (inputs: string) => {
    searchName.current = inputs;

    await getUsersList();
  };

  useEffect(() => {
    if (!isLogin) {
      return;
    }
    if (user.role === "ADMIN") {
      getUsersList();
      return;
    }
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
        {!isLoading && (
          <Pagenation
            pagenationInfo={pagenationInfo}
            selectedPageNumber={selectedPageNumber}
            setSelectedPageNumber={setSelectedPageNumber}
          />
        )}
      </Container>
    </ManageLayout>
  );
}

const Container = styled.div`
  margin: 40px auto 0px auto;
  width: calc(100% - 350px);
  box-sizing: border-box;
`;
