import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import styled from "styled-components";
import { ManageLayout } from "../../../components/manage/ManageLayout";
import { AuthContext } from "../../../store/AuthContext";
import { getSecureLocalStorage } from "../../../utils";

export default function ManageStaticis() {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const { grantRefresh } = useContext(AuthContext);
  const router = useRouter();
  const message = useAlert();
  const [isLoading, setIsLoading] = useState(true);

  const getRankSchool = async () => {
    const response = await axios
      .get("/users/rank/school", {
        params: {},
        headers: {
          Authorization: getSecureLocalStorage("accessToken"),
        },
      })
      .catch((err) => err.response);

    console.log(response, "getRankSchool");
    if (response.status === 401) {
      grantRefresh();
      return false;
    }

    if (!response.data.isSuccess) {
      message.info("조회 결과가 없습니다.");
      return false;
    }
    return response.data.data;
  };

  const getRankLanguage = async () => {
    const response = await axios
      .get("/users/rank/language", {
        params: {},
        headers: {
          Authorization: getSecureLocalStorage("accessToken"),
        },
      })
      .catch((err) => err.response);

    console.log(response, "getRankLanguage");
    if (response.status === 401) {
      grantRefresh();
      return false;
    }

    if (!response.data.isSuccess) {
      message.info("조회 결과가 없습니다.");
      return false;
    }
    return response.data.data;
  };

  const getRankHopeLanguage = async () => {
    const response = await axios
      .get("/users/rank/hopeLanguage", {
        params: {},
        headers: {
          Authorization: getSecureLocalStorage("accessToken"),
        },
      })
      .catch((err) => err.response);

    console.log(response, "getRankHopeLanguage");
    if (response.status === 401) {
      grantRefresh();
      return false;
    }

    if (!response.data.isSuccess) {
      message.info("조회 결과가 없습니다.");
      return false;
    }
    return response.data.data;
  };

  const getRankVisitedLanguage = async () => {
    const response = await axios
      .get("/users/rank/visited/language", {
        params: {},
        headers: {
          Authorization: getSecureLocalStorage("accessToken"),
        },
      })
      .catch((err) => err.response);

    console.log(response, "getRankVisitedLanguage");
    if (response.status === 401) {
      grantRefresh();
      return false;
    }

    if (!response.data.isSuccess) {
      message.info("조회 결과가 없습니다.");
      return false;
    }
    return response.data.data;
  };

  useEffect(() => {
    if (JSON.stringify(router.query) === JSON.stringify({})) return;
    const tmpType = router.query.type;
    const tmpTitle = router.query.title;

    if (tmpType === undefined || tmpTitle === undefined) return;
    setType(String(tmpType));
    setTitle(String(tmpTitle));

    (async () => {
      if (tmpType === "language") {
        const result = await getRankLanguage();
        return;
      }
      if (tmpType === "hopeLanguage") {
        const result = await getRankHopeLanguage();
        return;
      }
      const result = await getRankVisitedLanguage();
      return;

      setIsLoading(false);
    })();
  }, [JSON.stringify(router.query)]);

  return (
    <ManageLayout>
      <Container>
        <StatisticsHeader>
          <StatisticsTitle>{title}</StatisticsTitle>
        </StatisticsHeader>
      </Container>
    </ManageLayout>
  );
}

const Container = styled.div`
  margin: 40px auto 0px auto;
  width: calc(100% - 350px);
  box-sizing: border-box;
`;

const StatisticsHeader = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: flex-start;
`;

const StatisticsTitle = styled.h1`
  margin: 0px;
  padding: 0px;
`;
