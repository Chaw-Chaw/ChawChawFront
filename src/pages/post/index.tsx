import { LanguageLocale, Layout } from "../../components/common";
import styled from "styled-components";
import PostSearch from "./PostSearch";
import PostOrder, { orderOptions } from "./PostOrder";
import PostSection from "./PostSection";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import axios, { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";
import { getCookieParser } from "next/dist/next-server/server/api-utils";
import { RiCoinsLine } from "react-icons/ri";

const Container = styled.div<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "500px")};
  max-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 200px;
`;
export default function Post() {
  const [cookies, setCookie] = useCookies(["exclude"]);
  const [user, setUser] = useState(
    (() => {
      if (typeof window === "undefined") return {};
      const localStorageUser = window.localStorage.getItem("user");
      if (!localStorageUser) return {};
      return JSON.parse(localStorageUser);
    })()
  );
  const [postInfo, setPostInfo] = useState<any>([]);
  const postIds = useRef("");
  const searchName = useRef("");
  const [sortInfo, setSortInfo] = useState<string[]>(["", "", ""]);
  const [isEnd, setIsEnd] = useState(false);
  const isFirst = useRef(true);
  const message = useAlert();
  console.log(isFirst, "isFirst");

  const getPosts = async () => {
    const orderConvert = orderOptions[sortInfo[2]] || sortInfo[2];
    const languageConvert = LanguageLocale[sortInfo[0]]
      ? LanguageLocale[sortInfo[0]]
      : "";
    const hopeLanguageConvert = LanguageLocale[sortInfo[1]]
      ? LanguageLocale[sortInfo[1]]
      : "";
    setCookie("exclude", "", {
      path: "/",
      secure: true,
      sameSite: "none",
    });
    document.cookie = "exclude=" + postIds.current;
    console.log(document.cookie, "exclude");
    console.log(
      {
        name: searchName.current,
        language: languageConvert,
        hopeLanguage: hopeLanguageConvert,
        order: orderConvert,
        isFirst: isFirst.current,
      },
      "Params"
    );
    const response = await axios
      .get(`/users`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `${user?.token}`,
          Accept: "application/json",
        },
        params: {
          name: searchName.current,
          language: languageConvert,
          hopeLanguage: hopeLanguageConvert,
          order: orderConvert,
          isFirst: isFirst.current,
        },
      })
      .catch((err) => err.response);
    const data = response.data.data;
    if (response.status === 401) {
      // access token 만료
      // refresh token 전송
    }

    console.log(response, "res");

    if (response.data.responseMessage === "조회 결과가 존재하지 않음") {
      setIsEnd(true);
      message.error("더이상 POST가 존재하지 않습니다.");
      console.error(response.data.responseMessage);
      return;
    }

    if (isFirst.current === true)
      postIds.current += data.map((item: any) => item.id).join("/");
    else postIds.current += "/" + data.map((item: any) => item.id).join("/");
    console.log(postIds.current, "postids");
    setPostInfo((item: any) => {
      if (isFirst.current === true) return [...data];
      return [...item, ...data];
    });
    isFirst.current = false;
    console.log(searchName.current, "getPost()");
  };

  const searchHandler = (inputs: string) => {
    isFirst.current = true;
    postIds.current = "";
    searchName.current = inputs;
    getPosts();
  };

  const target = useRef<any>(null);
  const onIntersect = async (
    [entry]: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    if (entry.isIntersecting) {
      console.log(entry.isIntersecting, "보인다.");
      observer.unobserve(entry.target);
      await getPosts();
      observer.observe(entry.target);
    } else {
      console.log(entry.isIntersecting, "안보인다.");
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    target.current && observer.observe(target.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Layout type="post">
      <Container width="90%">
        <PostSearch searchHandler={searchHandler} />
        <PostOrder setSortInfo={setSortInfo} />
        <PostSection postInfo={postInfo} />
        <div
          ref={target}
          style={{
            display: isEnd ? "none" : "flex",
            width: "100%",
            height: "300px",
          }}
        ></div>
      </Container>
    </Layout>
  );
}
