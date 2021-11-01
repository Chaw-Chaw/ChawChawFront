import { CountryLocale, LanguageLocale } from "./LocaleList";
import { universityList } from "./UniversityList";

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
