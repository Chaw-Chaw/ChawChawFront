export const CHART_SUBJECT: {
  [index: string]: {
    subtitle: string;
    typeName: string;
  };
} = {
  RANK_SCHOOL: { subtitle: "유저 수", typeName: "학교 활성도 순위" },
  LANGUAGE: {
    subtitle: "해당 언어를 사용할 수 있는 유저 수",
    typeName: "할 수 있는 언어 순위",
  },
  HOPE_LANGUAGE: {
    subtitle: "해당 언어를 배우길 희망하는 유저 수",
    typeName: "희망 언어 순위",
  },
  SEARCH_LANGUAGE: {
    subtitle: "해당 언어를 검색한 유저 수",
    typeName: "인기 검색 언어 순위",
  },
};

export const SUBJECT_OPTIONS: { [index: string]: string } = {
  RANK_SCHOOL: "학교 활성도 순위",
  LANGUAGE: "할 수 있는 언어 순위",
  HOPE_LANGUAGE: "희망 언어 순위",
  SEARCH_LANGUAGE: "인기 검색 언어 순위",
};

export const SUBJECT_CONVERT: { [index: string]: string } = {
  "학교 활성도 순위": "RANK_SCHOOL",
  "할 수 있는 언어 순위": "LANGUAGE",
  "희망 언어 순위": "HOPE_LANGUAGE",
  "인기 검색 언어 순위": "SEARCH_LANGUAGE",
};

export const INIT_BAR_CHART_DATA = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "GreenYellow"],
  datasets: [
    {
      label: "",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ["rgba(247, 241, 227,0.4)"],
      borderColor: ["white"],
      borderWidth: 1,
    },
  ],
};

export const INIT_LINE_CHART_DATA = {
  labels: ["sun", "mon", "tue", "wed", "thur", "fri", "sat"],
  datasets: [
    {
      label: "유저 수",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: "rgba(255, 175, 64, 0.5)",
      borderColor: "#ffaf40",
      tension: 0.1,
    },
  ],
};

export const BASIC_CHART_DATA = {
  labels: ["sun", "mon", "tue", "wed", "thur", "fri", "sat"],
  datasets: [
    {
      label: "유저 수",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

export const USER_SEARCH_TYPE = "userSearch";
