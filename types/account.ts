import { DefaultResponseBody } from "./response";

export interface ProfileType {
  id: number;
  name: string;
  web_email: string;
  school: string;
  imageUrl: string;
  content: string;
  repCountry: string;
  repLanguage: string;
  repHopeLanguage: string;
  role: string;
  country: string[];
  language: string[];
  hopeLanguage: string[];
  facebookUrl: string;
  instagramUrl: string;
}

export interface LoginResponseBody {
  profile: ProfileType;
  token: TokenType;
  blockIds: number[];
}

export interface TokenType extends RefreshResponseBody {
  refreshTokenExpiresIn: number;
}

export interface RefreshResponseBody {
  tokenType: string;
  accessToken: string;
  expiresIn: string;
}

export interface GrantRefreshResponseType
  extends DefaultResponseBody<RefreshResponseBody> {}

export interface LoginProps {
  email: string;
  password: string;
  provider: "basic";
}

export interface KakaoLoginProps {
  kakaoToken: string;
  provider: "kakao";
}
export interface FacebookLoginProps {
  facebookId: string;
  facebookToken: string;
  provider: "facebook";
}

export interface SignupPropsSocial {
  email: string;
  name: string;
  web_email: string;
  school: string;
  imageUrl: string;
  provider: string;
}

export interface SignupProps extends SignupPropsSocial {
  password: string;
}
