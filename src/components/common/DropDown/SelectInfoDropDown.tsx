import { SetStateAction } from "react";
import { CountryLocale, LocaleLanguage } from "../../../constants/LocaleList";
import { DropDown } from "./DropDown";
import { InitialBoxProps } from "./DropDownBox";

interface SelectInfoDropDown extends InitialBoxProps {
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

const SelectInfoDropDown: React.FC<SelectInfoDropDown> = (props) => {
  const options = [props.initialValue, ...props.options];
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
      type={props.type}
      setValues={props.setValues}
      value={props.value}
    />
  );
};
export { SelectInfoDropDown };
