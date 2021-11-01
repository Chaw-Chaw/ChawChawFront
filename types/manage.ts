export interface SearchConditionType {
  name: string;
  language: string;
  hopeLanguage: string;
  country: string;
  school: string;
  sort: string;
  order: string;
  pageNo: number;
}

export interface UserListItemType {
  id: number; // 이거 순번 아니고 그냥 userId
  name: string;
  school: string;
  email: string;
  repCountry: string;
  repLanguage: string;
  repHopeLanguage: string;
  likes: number;
  views: string;
  regDate: string;
}

export interface PagenationInfoType {
  totalCnt: number;
  startPage: number;
  endPage: number;
  curPage: number;
  isNext: boolean;
  isPrevious: boolean;
}

export interface UserListType extends PagenationInfoType {
  contents: UserListItemType[];
}
