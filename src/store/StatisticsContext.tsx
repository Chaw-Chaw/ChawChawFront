import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

import { useAlert } from "react-alert";
import { LocaleLanguage } from "../components/common";

interface ChartData {
  labels: string[];
  data: number[];
}

interface RankSchoolType {
  schoolName: string;
  userCnt: number;
}

interface RankLanguageType {
  languageAbbr: string;
  userCnt: number;
}

interface RankHopeLanguageType {
  hopeLanguageAbbr: string;
  userCnt: number;
}

interface RankVisitedLanguageType {
  languageAbbr: string;
  userCnt: number;
}

interface StatisticsContextObj {
  getRankSchool: () => Promise<ChartData | false>;
  getRankLanguage: () => Promise<ChartData | false>;
  getRankHopeLanguage: () => Promise<ChartData | false>;
  getRankVisitedLanguage: () => Promise<ChartData | false>;
}

const StatisticsContext = React.createContext<StatisticsContextObj>({
  getRankSchool: () => new Promise(() => {}),
  getRankLanguage: () => new Promise(() => {}),
  getRankHopeLanguage: () => new Promise(() => {}),
  getRankVisitedLanguage: () => new Promise(() => {}),
});

const StatisticsContextProvider: React.FC = (props) => {
  const { grantRefresh } = useContext(AuthContext);
  const message = useAlert();

  const getRankSchool = async () => {
    const response = await axios
      .get("/users/rank/school")
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

    const data: RankSchoolType[] = response.data.data;
    const tmpChartData: ChartData = {
      labels: [],
      data: [],
    };

    data.forEach((item) => {
      tmpChartData.labels.push(item.schoolName);
      tmpChartData.data.push(item.userCnt);
    });
    console.log(tmpChartData, "extractItems");
    return tmpChartData;
  };

  const getRankLanguage = async () => {
    const response = await axios
      .get("/users/rank/language")
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

    const data: RankLanguageType[] = response.data.data;
    const tmpChartData: ChartData = {
      labels: [],
      data: [],
    };

    data.forEach((item) => {
      tmpChartData.labels.push(LocaleLanguage[item.languageAbbr]);
      tmpChartData.data.push(item.userCnt);
    });
    console.log(tmpChartData, "extractItems");
    return tmpChartData;
  };

  const getRankHopeLanguage = async () => {
    const response = await axios
      .get("/users/rank/hopeLanguage")
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

    const data: RankHopeLanguageType[] = response.data.data;
    const tmpChartData: ChartData = {
      labels: [],
      data: [],
    };

    data.forEach((item) => {
      tmpChartData.labels.push(LocaleLanguage[item.hopeLanguageAbbr]);
      tmpChartData.data.push(item.userCnt);
    });
    console.log(tmpChartData, "extractItems");
    return tmpChartData;
  };

  const getRankVisitedLanguage = async () => {
    const response = await axios
      .get("/users/rank/visited/language")
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

    const data: RankVisitedLanguageType[] = response.data.data;
    const tmpChartData: ChartData = {
      labels: [],
      data: [],
    };

    data.forEach((item) => {
      tmpChartData.labels.push(LocaleLanguage[item.languageAbbr]);
      tmpChartData.data.push(item.userCnt);
    });
    console.log(tmpChartData, "extractItems");
    return tmpChartData;
  };

  const contextValue: StatisticsContextObj = {
    getRankSchool,
    getRankLanguage,
    getRankHopeLanguage,
    getRankVisitedLanguage,
  };

  return (
    <StatisticsContext.Provider value={contextValue}>
      {props.children}
    </StatisticsContext.Provider>
  );
};

export { StatisticsContext, StatisticsContextProvider };
export type {
  RankHopeLanguageType,
  RankLanguageType,
  RankSchoolType,
  RankVisitedLanguageType,
};
