import { BlockItem } from "../components/manage/ManageBlockList";
import { ProfileType } from "./account";

export interface UploadProfileType {
  country: string[];
  language: string[];
  hopeLanguage: string[];
  content: string;
  facebookUrl: string;
  instagramUrl: string;
  imageUrl: string;
  repCountry: string;
  repLanguage: string;
  repHopeLanguage: string;
}
export interface ManageUploadProfileType extends UploadProfileType {
  userId: number;
}

export interface ManageUserInfoType {
  name: string;
  imageUrl: string;
  content: string;
  country: string[];
  language: string[];
  hopeLanguage: string[];
  repCountry: string;
  repLanguage: string;
  repHopeLanguage: string;
  facebookUrl: string;
  instagramUrl: string;
  days: string;
  views: number;
  likes: number;
  blockUsers: BlockItem[];
}
