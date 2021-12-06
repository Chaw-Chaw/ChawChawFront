import { KAKAO_CLIENT_ID } from "./login";

export const DEFAULT_PROFILE_IMAGE =
  "https://d2anzi03nvjlav.cloudfront.net/default.png";

export const DEFAULT_FACEBOOK_URL = "https://www.facebook.com";
export const DEFAULT_INSTAGRAM_URL = "https://www.instagram.com";
export const DEVELOPMENT_OAUTH_URL = "http://localhost:3000/account/oauth";
export const PRODUCT_OAUTH_URL = "https://chawchaw.vercel.app/account/oauth";
export const BACKEND_URL = "https://chawchaw.xyz";

export const KAKAO_OAUTH_URL = "https://kauth.kakao.com/oauth/authorize";
export const REDIRECT_URL =
  process.env.NODE_ENV === "development"
    ? DEVELOPMENT_OAUTH_URL
    : PRODUCT_OAUTH_URL;

export const KAKAO_OAUTH_REDIRECT_URL = `${KAKAO_OAUTH_URL}?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;
