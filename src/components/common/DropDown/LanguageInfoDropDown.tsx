import { useMemo } from "react";
import { LanguageLocale } from "../../../constants/LocaleList";
import { NOMAL_TYPE } from "../../../constants/profile";
import { LanguageInfoDropDownProps } from "../../../types/common";
import { DropDown } from "./DropDown";

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
