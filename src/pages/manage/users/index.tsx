import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ManageLayout } from "../../../components/manage/ManageLayout";
import { UserOrder } from "../../../components/manage/UserOrder";
import { UserList } from "../../../components/manage/UserList";
import { PostSearch as UserSearch } from "../../../components/post/PostSearch";
import { LanguageLocale, Pagenation } from "../../../components/common";
import { orderOptions, sortOptions } from "../../../constants/order";
import { PagenationInfoType, UserListItemType } from "../../../types/manage";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { takeUserList } from "../../../store/actions/manageActions";
import { alertActions, asyncErrorHandle } from "../../../store/alertSlice";
import { ADMIN_ROLE, INFO_ALERT, INFO_NOTRESULT_MSG } from "../../../constants";
import { isLogin } from "../../../utils";

export default function ManageUser() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
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

  const getUsersList = useCallback(async () => {
    try {
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

      const data = await dispatch(takeUserList(searchCondition)).unwrap();
      setUsersList(data.contents);
      if (data.contents.length === 0) {
        dispatch(
          alertActions.updateAlert({
            name: INFO_ALERT,
            message: INFO_NOTRESULT_MSG,
          })
        );
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
    } catch (error) {
      dispatch(asyncErrorHandle(error));
    }
  }, [dispatch, searchInfo, selectedPageNumber]);

  const userSearchHandler = async (inputs: string) => {
    searchName.current = inputs;

    await getUsersList();
  };

  useEffect(() => {
    if (!isLogin()) {
      return;
    }
    if (user.role === ADMIN_ROLE) {
      getUsersList();
      return;
    }
  }, [user.role, getUsersList]);

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
