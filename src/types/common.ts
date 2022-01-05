import { ReactNode, SetStateAction } from "react";

export interface ListItemProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}
export interface ButtonProps {
  width?: string;
  height?: string;
  primary?: boolean;
  secondary?: boolean;
  fontWeight?: string;
  fontSize?: string;
}

export interface ChangeLanguageDropDownProps {
  selectLanguage: string[];
  setSelectLanguage: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface DropDownProps extends InitialBoxProps {
  options: string[];
  initialValue: string;
  index: number;
  type: "SEARCH" | "NORMAL";
  setValues: React.Dispatch<React.SetStateAction<string[]>>;
  children?: React.ReactNode;
}

export interface InitialBoxProps {
  fontWeight: string;
  fontSize: string;
  width: string;
  height: string;
  backgroundColor: string;
  value: string;
  color: string;
  children?: ReactNode;
}

export interface DropDownBoxProps extends InitialBoxProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
export interface LanguageInfoDropDownProps extends InitialBoxProps {
  index: number;
  setValues: React.Dispatch<SetStateAction<string[]>>;
  fontSize: string;
  width: string;
  height: string;
  backgroundColor: string;
  value: string;
  color: string;
  initialValue: string;
}
export interface SelectInfoDropDownProps extends InitialBoxProps {
  initialValue: string;
  options: string[];
  type: "SEARCH" | "NORMAL";
  index: number;
  setValues: React.Dispatch<SetStateAction<string[]>>;
  fontSize: string;
  width: string;
  height: string;
  backgroundColor: string;
  value: string;
  color: string;
}
