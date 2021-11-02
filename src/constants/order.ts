import { CountryLocale, LanguageLocale } from "./LocaleList";
import { UniversityList } from "./UniversityList";

export const postOrderOptions: {
  [index: string]: string;
} = {
  최신: "date",
  조회수: "view",
  좋아요: "like",
};

export const orderOptions: {
  [index: string]: string;
} = {
  오름차순: "asc",
  내림차순: "desc",
};

export const sortOptions: {
  [index: string]: string;
} = {
  등록일: "date",
  이름: "name",
  좋아요: "like",
  조회수: "view",
};

export const userOrderDropDownList = [
  {
    id: 0,
    initialValue: "선택언어",
    options: Object.keys(LanguageLocale),
  },
  {
    id: 1,
    initialValue: "선택희망언어",
    options: Object.keys(LanguageLocale),
  },
  { id: 2, initialValue: "나라", options: Object.keys(CountryLocale) },
  {
    id: 3,
    initialValue: "학교",
    options: Object.keys(UniversityList).sort(),
  },
  {
    id: 4,
    initialValue: "정렬",
    options: Object.keys(sortOptions),
  },
  {
    id: 5,
    initialValue: "순서",
    options: Object.keys(orderOptions),
  },
];

export const selectItemInfoList = [
  {
    id: 0,
    options: Object.keys(LanguageLocale),
    initialValue: "선택언어",
  },
  {
    id: 1,
    options: Object.keys(LanguageLocale),
    initialValue: "선택희망언어",
  },
  {
    id: 2,
    options: Object.keys(postOrderOptions),
    initialValue: "순서",
  },
];
