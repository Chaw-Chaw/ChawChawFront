import React, { SetStateAction } from "react";

export interface PostCardInfoProps {
  pastDate: number;
  views: number;
  likes: number;
}

export interface PostCardImageInfoProps {
  repCountry: string;
  repLanguage: string;
  repHopeLanguage: string;
  name: string;
}

export interface PostCardProps
  extends PostCardInfoProps,
    PostCardImageInfoProps {
  imageUrl: string;
  id: number;
  content: string;
  regDate?: string;
}

export interface PostModalHeadProps {
  regDate: string;
  likes: number;
  views: number;
}

export interface PostModalInfoProps extends PostModalHeadProps {
  content: string;
  country: string[];
  facebookUrl: string;
  hopeLanguage: string[];
  id: number;
  imageUrl: string;
  instagramUrl: string;
  language: string[];
  name: string;
  repCountry: string;
  repHopeLanguage: string;
  repLanguage: string;
  isLike: boolean;
}
export interface PostModalProps extends PostModalInfoProps {
  children?: React.ReactNode;
}

export interface PostOrderProps {
  sortInfo: string[];
  setSortInfo: React.Dispatch<SetStateAction<string[]>>;
}
export interface SearchPostCardProps {
  name: string;
  language: string;
  hopeLanguage: string;
  order: string;
  isFirst: boolean;
}
export interface PostCardImageInfoProps {
  repCountry: string;
  repLanguage: string;
  repHopeLanguage: string;
  name: string;
}

export interface PostModalActiveProps {
  id: number;
  isLike: boolean;
}

export interface PostSearchProps {
  searchHandler: (inputs: string) => void;
}

export interface PostSectionProps {
  postInfo: PostCardProps[];
}
