import {
  DEFAULT_FACEBOOK_URL,
  DEFAULT_INSTAGRAM_URL,
  DEFAULT_PROFILE_IMAGE,
} from "./urls";

export const INIT_USERINFO = {
  name: "",
  imageUrl: DEFAULT_PROFILE_IMAGE,
  content: "",
  country: ["Select"],
  language: ["Select"],
  hopeLanguage: ["Select"],
  repCountry: "",
  repLanguage: "",
  repHopeLanguage: "",
  facebookUrl: DEFAULT_FACEBOOK_URL,
  instagramUrl: DEFAULT_INSTAGRAM_URL,
  school: "",
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
