import { LanguageLocale, Layout } from "../../components/common";
import styled from "styled-components";
import { PostSearch } from "../../components/post/PostSearch";
import PostOrder from "../../components/post/PostOrder";
import PostSection from "../../components/post/PostSection";
import { useCallback, useEffect, useRef, useState } from "react";
import { orderOptions } from "../../constants/order";
import { PostCardProps } from "../../types/post";
import {
  ADMIN_ROLE,
  CONFIRM_PUSH_LOGINPAGE,
  ERROR_ALERT,
  ERROR_ENTER_AFTERLOGIN_MSG,
  INFO_ALERT,
  INFO_NOTRESULT_MSG,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { BASIC, SEARCH } from "../../constants/post";
import { getPostCardList } from "../../store/actions/postActions";
import { alertActions } from "../../store/alertSlice";
import { isLogin, userRole } from "../../utils";
import { asyncErrorHandle } from "../../store/actions/alertActions";

export default function Post() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [postInfo, setPostInfo] = useState<PostCardProps[]>([]);
  const [sortInfo, setSortInfo] = useState<string[]>([
    "선택언어",
    "선택희망언어",
    "순서",
  ]);
  const selectLanguage = sortInfo[0];
  const selectHopeLanguage = sortInfo[1];
  const selectOrder = sortInfo[2];

  const [isEnd, setIsEnd] = useState(false);
  const postIds = useRef("");
  const searchName = useRef("");
  const blockIds = user.blockIds ? user.blockIds.join("/") : "";
  const searchType = useRef(BASIC);

  const loadPostCards = useCallback(async () => {
    const languageConvert = LanguageLocale[selectLanguage] || "";
    const hopeLanguageConvert = LanguageLocale[selectHopeLanguage] || "";
    const orderConvert = orderOptions[selectOrder] || "";
    const isFirst = postIds.current === "";

    const searchCondition = {
      name: searchName.current,
      language: languageConvert,
      hopeLanguage: hopeLanguageConvert,
      order: orderConvert,
      isFirst: isFirst,
    };

    try {
      const data = await dispatch(getPostCardList(searchCondition)).unwrap();
      if (data.length === 0) {
        setIsEnd(true);
        if (isFirst && searchType.current === SEARCH) {
          dispatch(
            alertActions.updateAlert({
              name: INFO_ALERT,
              message: INFO_NOTRESULT_MSG,
            })
          );
        }
        return;
      }

      if (postIds.current === "") {
        postIds.current += data.map((item) => item.id).join("/");
      } else {
        postIds.current += "/" + data.map((item) => item.id).join("/");
      }

      setPostInfo((item) => {
        const result = item;
        if (isFirst === true) return data;
        return result.concat(data);
      });
    } catch (error) {
      setIsEnd(true);
      dispatch(asyncErrorHandle(error));
      return;
    }
  }, [dispatch, selectLanguage, selectHopeLanguage, selectOrder]);

  const searchHandler = useCallback(
    async (inputs: string) => {
      // 검색조건 초기화
      setIsEnd(false);
      postIds.current = "";
      searchName.current = inputs;

      // 검색 직후 바로 observer로 인한 중복검색 방지
      searchType.current = SEARCH;
      document.cookie = "exclude=" + blockIds + ";path=/;";
      await loadPostCards();
      document.cookie = "exclude=;path=/;expires=Thu, 18 Dec 2013 12:00:00 GMT";
      searchType.current = BASIC;
    },
    [blockIds, loadPostCards]
  );

  const target = useRef<HTMLDivElement>(null);

  const onIntersect = useCallback(
    async (
      [entry]: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);

        // 쿠키 설정이 비동기 식인가? 아니다. Path 설정을 안해두면 두번쨰 exclude 를 만들어버린다.
        // exclude에는 차단된 아이디들이 초기값으로 들어가야한다.
        if (blockIds === "") {
          document.cookie = "exclude=" + postIds.current + ";path=/;";
        } else if (postIds.current === "") {
          document.cookie = "exclude=" + blockIds + ";path=/;";
        } else {
          document.cookie =
            "exclude=" + blockIds + "/" + postIds.current + ";path=/;";
        }

        await loadPostCards();
        document.cookie =
          "exclude=;path=/;expires=Thu, 18 Dec 2013 12:00:00 GMT";
        observer.observe(entry.target);
      }
    },
    [loadPostCards, blockIds]
  );

  useEffect(() => {
    if (userRole() === ADMIN_ROLE) return;
    if (!isLogin()) {
      dispatch(
        alertActions.updateAlert({
          name: ERROR_ALERT,
          message: ERROR_ENTER_AFTERLOGIN_MSG,
          confirmFuncName: CONFIRM_PUSH_LOGINPAGE,
        })
      );
      return;
    }

    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.5,
    });
    target.current && observer.observe(target.current);
    return () => observer.disconnect();
  }, [dispatch, onIntersect]);

  return (
    <Layout>
      <Container>
        <PostSearch searchHandler={searchHandler} />
        <PostOrder setSortInfo={setSortInfo} sortInfo={sortInfo} />
        <PostSection postInfo={postInfo} />
        <BlankBox ref={target} display={isEnd ? "none" : "flex"} />
        <Divider display={isEnd ? "flex" : "none"} />
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  width: 90%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 200px;
  margin-top: 100px;
  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

const Divider = styled.div<{ display: string }>`
  display: ${(props) => props.display};
  width: 100%;
  height: 100px;
  border-bottom: 1px solid ${(props) => props.theme.secondaryColor};
`;

const BlankBox = styled.div<{ display: string }>`
  display: ${(props) => props.display};
  width: 100%;
  height: 300px;
`;
