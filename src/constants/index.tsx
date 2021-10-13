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
