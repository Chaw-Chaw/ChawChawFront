export const DEFAULT_PROFILE_IMAGE =
  "https://d2anzi03nvjlav.cloudfront.net/default.png";

export const DEFAULT_FACEBOOK_URL = "https://www.facebook.com";
export const DEFAULT_INSTAGRAM_URL = "https://www.instagram.com";
export const DEVELOPMENT_OAUTH_URL = "http://localhost:3000/account/oauth";
export const PRODUCT_OAUTH_URL = "https://chawchaw.vercel.app/account/oauth";
export const BACKEND_URL = "https://mylifeforcoding.com";
export const KAKAO_OAUTH_URL = "https://kauth.kakao.com/oauth/authorize";
export const REDIRECT_URL =
  process.env.NODE_ENV === "development"
    ? DEVELOPMENT_OAUTH_URL
    : PRODUCT_OAUTH_URL;

export const KAKAO_CLIENT_ID = "de32392365a519fc6df93e6196a5ad6b";
export const FACEBOOK_APP_ID = "1235018336951383";
export const GOOGLE_TRANSLATE_API_KEY =
  "AIzaSyAPPDPbRJpIyu85TfVohtElpSnt7rFehN0";

export const INITIAL_ID = -1;
export const INITIAL_ROOMID = -1;
export const LIMIT_NEWALARM_SIZE = 99;
export const FIRST_STAGE = 1;
export const SECOND_STAGE = 2;
export const SECRET_KEY = "HOLYBANG1!";

export const MIN_1 = 60000;
export const MIN_30 = 180000;

export const USEAGE_INFO = [
  {
    title: "무료채팅",
    subtitle:
      "인터넷이 가능한 장소라면 언제나 ChawChaw! /n1대1 채팅으로 메세지와 이미지 전송까지!, 설치 없이 인터넷만 된다면 우리학교 버디와 마음것 채팅해요!",
    src: "/Layout/chatting.png",
  },
  {
    title: "프로필",
    subtitle:
      "프로필을 통해 나를 표현하세요! /n내가 할 수 있는 언어, 소개글, SNS 주소등으로 나와 맞는 버디와 채팅해요! 💬",
    src: "/Layout/profile.png",
  },
  {
    title: "친구찾기",
    subtitle:
      "조건에 맞는 버디를 검색하고 찾아봐요. /n버디들이 만든 프로필을 살펴보고 채팅을 걸어봐요. 너무 멋진 버디가 있다면 좋아요 꾹! ❤️",
    src: "/Layout/searchPost.png",
  },
  {
    title: "언어번역",
    subtitle:
      "버디가 보낸메세지가 무슨 말이지? 내가 맞게 말한 건가? /n버디가 말한 메세지가 어떤말인지 번역하고 학습하세요. 내가 배운 언어가 의도에 맞게 전달 된건지 확인해봐요. 👀",
    src: "/Layout/translation.png",
  },
];
