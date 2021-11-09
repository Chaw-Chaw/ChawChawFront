import { LanguageLocale, Layout } from "../../components/common";
import styled from "styled-components";
import { PostSearch } from "../../components/post/PostSearch";
import PostOrder from "../../components/post/PostOrder";
import PostSection from "../../components/post/PostSection";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import { orderOptions } from "../../constants/order";
import { usePost } from "../../hooks/api/post/usePost";
import { PostCardProps } from "../../../types/post";
import { LOGIN_API_URL } from "../../constants";

export default function Post() {
  const { user, isLogin } = useContext(AuthContext);
  const { getPostCardList } = usePost();
  const [postInfo, setPostInfo] = useState<PostCardProps[]>([]);
  const [sortInfo, setSortInfo] = useState<string[]>([
    "선택언어",
    "선택희망언어",
    "순서",
  ]);
  const [isEnd, setIsEnd] = useState(false);
  const postIds = useRef("");
  const searchName = useRef("");
  const message = useAlert();
  const router = useRouter();
  const blockIds = user.blockIds ? user.blockIds.join("/") : "";
  const searchType = useRef("BASIC");

  const loadPostCards = async () => {
    const languageConvert = LanguageLocale[sortInfo[0]] || "";
    const hopeLanguageConvert = LanguageLocale[sortInfo[1]] || "";
    const orderConvert = orderOptions[sortInfo[2]] || "";
    const isFirst = postIds.current === "";

    const searchCondition = {
      name: searchName.current,
      language: languageConvert,
      hopeLanguage: hopeLanguageConvert,
      order: orderConvert,
      isFirst: isFirst,
    };

    try {
      const data = await getPostCardList(searchCondition);
      if (data.length === 0) {
        setIsEnd(true);
        if (isFirst && searchType.current === "SEARCH") {
          message.info("조회 결과가 없습니다.");
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
    } catch {
      setIsEnd(true);
      return;
    }
  };

  const searchHandler = async (inputs: string) => {
    // 검색조건 초기화
    setIsEnd(false);
    postIds.current = "";
    searchName.current = inputs;

    // 검색 직후 바로 observer로 인한 중복검색 방지
    searchType.current = "SEARCH";
    document.cookie = "exclude=" + blockIds + ";path=/;";
    await loadPostCards();
    document.cookie = "exclude=;path=/;expires=Thu, 18 Dec 2013 12:00:00 GMT";
    searchType.current = "BASIC";
  };

  const target = useRef<HTMLDivElement>(null);

  const onIntersect = async (
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
      document.cookie = "exclude=;path=/;expires=Thu, 18 Dec 2013 12:00:00 GMT";
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    if (user.role === "ADMIN") return;
    if (!isLogin) {
      message.error("로그인 후에 서비스를 이용해주세요.", {
        onClose: () => {
          router.push(LOGIN_API_URL);
        },
      });
      return;
    }

    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.5,
    });
    target.current && observer.observe(target.current);
    return () => observer.disconnect();
  }, []);

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
