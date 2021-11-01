import { DEFAULT_PROFILE_IMAGE } from "./urls";

export const initialPostInfo = {
  content: "",
  country: [],
  regDate: "",
  facebookUrl: "",
  likes: 0,
  hopeLanguage: [],
  id: 0,
  imageUrl: DEFAULT_PROFILE_IMAGE,
  instagramUrl: "",
  language: [],
  name: "",
  repCountry: "",
  repHopeLanguage: "",
  repLanguage: "",
  views: 0,
  isLike: false,
};

export const ORDER_OPTIONS: {
  [index: string]: string;
} = {
  최신: "date",
  조회수: "view",
  좋아요: "like",
};
