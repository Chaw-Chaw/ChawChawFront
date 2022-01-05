import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BASIC_CHART_DATA,
  CHART_SUBJECT,
  RANK_HOPE_LANGUAGE_API_URL,
  RANK_LANGUAGE_API_URL,
  RANK_SCHOOL_API_URL,
  RANK_VISITED_LANGUAGE_API_URL,
} from "../constants";
import {
  HOPE_LANGUAGE,
  LANGUAGE,
  RANK_SCHOOL,
  SEARCH_LANGUAGE,
} from "../constants/chart";
import { LocaleLanguage } from "../constants/LocaleList";
import { DefaultResponseBody } from "../types/response";
import {
  ChartData,
  RankHopeLanguageType,
  RankLanguageType,
  RankSchoolType,
  RankVisitedLanguageType,
} from "../types/statistics";
import { request } from "../utils/request";

const initialState: { subtitle: string } = { subtitle: "" };

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    updateSubtitle(state, action: PayloadAction<string>) {
      state.subtitle = action.payload;
    },
  },
});

export const chartActions = chartSlice.actions;
export default chartSlice.reducer;

export const getChartData = createAsyncThunk(
  "chart/getChartData",
  async (subject: string, thunkAPI) => {
    const initChartData = BASIC_CHART_DATA;
    let data;
    const tmpChartData: ChartData = {
      labels: [],
      data: [],
    };
    const initChartDataCopy = JSON.parse(JSON.stringify(initChartData));

    if (subject === RANK_SCHOOL) {
      const response = await request.get<DefaultResponseBody<RankSchoolType[]>>(
        RANK_SCHOOL_API_URL
      );
      data = response.data.data;
      data.forEach((item) => {
        tmpChartData.labels.push(item.schoolName);
        tmpChartData.data.push(item.userCnt);
      });
    }
    if (subject === LANGUAGE) {
      const response = await request.get<
        DefaultResponseBody<RankLanguageType[]>
      >(RANK_LANGUAGE_API_URL);
      data = response.data.data;
      data.forEach((item) => {
        tmpChartData.labels.push(LocaleLanguage[item.languageAbbr]);
        tmpChartData.data.push(item.userCnt);
      });
    }
    if (subject === HOPE_LANGUAGE) {
      const response = await request.get<
        DefaultResponseBody<RankHopeLanguageType[]>
      >(RANK_HOPE_LANGUAGE_API_URL);
      data = response.data.data;
      data.forEach((item) => {
        tmpChartData.labels.push(LocaleLanguage[item.hopeLanguageAbbr]);
        tmpChartData.data.push(item.userCnt);
      });
    }
    if (subject === SEARCH_LANGUAGE) {
      const response = await request.get<
        DefaultResponseBody<RankVisitedLanguageType[]>
      >(RANK_VISITED_LANGUAGE_API_URL);
      data = response.data.data;
      data.forEach((item) => {
        tmpChartData.labels.push(LocaleLanguage[item.languageAbbr]);
        tmpChartData.data.push(item.userCnt);
      });
    }
    initChartDataCopy.labels = tmpChartData.labels;
    initChartDataCopy.datasets[0].data = tmpChartData.data;
    initChartDataCopy.datasets[0].label = CHART_SUBJECT[subject].subtitle;
    thunkAPI.dispatch(
      chartActions.updateSubtitle(CHART_SUBJECT[subject].subtitle)
    );

    return initChartDataCopy;
  }
);
