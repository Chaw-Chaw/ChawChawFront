import { Dispatch, SetStateAction } from "react";
import { ListItemProps } from "./common";
import { BlockItem } from "./manage";

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

export interface ProfileSection {
  title?: string;
  content?: string;
}

export interface ProfileContentProps {
  placeholder?: string;
  title?: string;
  setValues: Dispatch<SetStateAction<string>>;
  values: string;
  name?: string;
}

export interface ProfileSelectInfoProps extends ListItemProps {
  setValues: React.Dispatch<SetStateAction<string[]>>;
  values: string[];
  type: string;
  count: number;
}

export interface ProfileSocialUrlFragmentProps {
  type?: string;
  url?: string;
  setUrl?: Dispatch<SetStateAction<string>>;
}
