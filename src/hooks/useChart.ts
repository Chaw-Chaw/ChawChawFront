import { useState } from "react";
import {
  ChartData,
  RankHopeLanguageType,
  RankLanguageType,
  RankSchoolType,
  RankVisitedLanguageType,
} from "../../types/statistics";
import { LocaleLanguage } from "../components/common";
import {
  INIT_BAR_CHART_DATA,
  CHART_SUBJECT,
  RANK_HOPE_LANGUAGE_API_URL,
  RANK_LANGUAGE_API_URL,
  RANK_SCHOOL_API_URL,
  RANK_VISITED_LANGUAGE_API_URL,
  BASIC_CHART_DATA,
} from "../constants";
import { useApi } from "./api/useApi";

export const useChart = () => {
  const initChartData = BASIC_CHART_DATA;
  const [subtitle, setSubtitle] = useState(
    INIT_BAR_CHART_DATA.datasets[0].label
  );
  const { sendGet } = useApi();

  const getRankSchool = async () => {
    const { data } = await sendGet<RankSchoolType[]>(RANK_SCHOOL_API_URL);
    return data;
  };
  const getRankLanguage = async () => {
    const { data } = await sendGet<RankLanguageType[]>(RANK_LANGUAGE_API_URL);
    return data;
  };
  const getRankHopeLanguage = async () => {
    const { data } = await sendGet<RankHopeLanguageType[]>(
      RANK_HOPE_LANGUAGE_API_URL
    );
    return data;
  };
  const getRankVisitedLanguage = async () => {
    const { data } = await sendGet<RankVisitedLanguageType[]>(
      RANK_VISITED_LANGUAGE_API_URL
    );
    return data;
  };

  const getChartData = async (subject: string) => {
    let data;
    const tmpChartData: ChartData = {
      labels: [],
      data: [],
    };
    const initChartDataCopy = JSON.parse(JSON.stringify(initChartData));

    if (subject === "RANK_SCHOOL") {
      data = await getRankSchool();
      data.forEach((item) => {
        tmpChartData.labels.push(item.schoolName);
        tmpChartData.data.push(item.userCnt);
      });
    }
    if (subject === "LANGUAGE") {
      data = await getRankLanguage();
      data.forEach((item) => {
        tmpChartData.labels.push(LocaleLanguage[item.languageAbbr]);
        tmpChartData.data.push(item.userCnt);
      });
    }
    if (subject === "HOPE_LANGUAGE") {
      data = await getRankHopeLanguage();
      data.forEach((item) => {
        tmpChartData.labels.push(LocaleLanguage[item.hopeLanguageAbbr]);
        tmpChartData.data.push(item.userCnt);
      });
    }
    if (subject === "SEARCH_LANGUAGE") {
      data = await getRankVisitedLanguage();
      data.forEach((item) => {
        tmpChartData.labels.push(LocaleLanguage[item.languageAbbr]);
        tmpChartData.data.push(item.userCnt);
      });
    }
    initChartDataCopy.labels = tmpChartData.labels;
    initChartDataCopy.datasets[0].data = tmpChartData.data;
    initChartDataCopy.datasets[0].label = CHART_SUBJECT[subject].subtitle;
    setSubtitle(CHART_SUBJECT[subject].subtitle);

    return initChartDataCopy;
  };

  return { subtitle, getChartData };
};
