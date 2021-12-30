import { SetStateAction, useMemo } from "react";
import {
  CountryLocale,
  LanguageLocale,
  LocaleLanguage,
} from "../../../constants/LocaleList";
import { NOMAL_TYPE } from "../../../constants/profile";
import { DropDown } from "./DropDown";
import { InitialBoxProps } from "./DropDownBox";

interface LanguageInfoDropDownProps extends InitialBoxProps {
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

const LanguageInfoDropDown: React.FC<LanguageInfoDropDownProps> = (props) => {
  const options = useMemo(
    () => [props.initialValue, ...Object.keys(LanguageLocale)],
    [props.initialValue]
  );

  return (
    <DropDown
      fontWeight="900"
      fontSize={props.fontSize}
      width={props.width}
      height={props.height}
      options={options}
      backgroundColor={props.backgroundColor}
      color={props.color}
      initialValue={props.initialValue}
      index={props.index}
      type={NOMAL_TYPE}
      setValues={props.setValues}
      value={props.value}
    />
  );
};
export { LanguageInfoDropDown };
