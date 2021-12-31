import { ManageUploadProfileType, ManageUserInfoType } from "../types/profile";
import {
  DEFAULT_FACEBOOK_URL,
  DEFAULT_INSTAGRAM_URL,
  DEFAULT_PROFILE_IMAGE,
} from "./urls";

export const SELECT = "Select";
export const COUNTRY_TYPE = "country";
export const LANGUAGE_TYPE = "language";
export const NOMAL_TYPE = "NORMAL";
export const TYPE_FACEBOOK = "facebook";
export const TYPE_INSTAGRAM = "instagram";

export const INIT_USERINFO: ManageUserInfoType = {
  name: "",
  imageUrl: DEFAULT_PROFILE_IMAGE,
  content: "",
  country: [SELECT],
  language: [SELECT],
  hopeLanguage: [SELECT],
  repCountry: "",
  repLanguage: "",
  repHopeLanguage: "",
  facebookUrl: DEFAULT_FACEBOOK_URL,
  instagramUrl: DEFAULT_INSTAGRAM_URL,
  days: "",
  views: 0,
  likes: 0,
  blockUsers: [
    {
      userId: 0,
      name: "",
      imageUrl: "",
    },
  ],
};
