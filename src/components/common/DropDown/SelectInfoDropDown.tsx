import { CountryLocale, LocaleLanguage } from "../LocaleList";
import { DropDown } from "./DropDown";
import { DropDownProps } from "./DropDownBox";

interface SelectInfoDropDownProps extends DropDownProps {}

const SelectInfoDropDown: React.FC<SelectInfoDropDownProps> = (props) => {
  return (
    <DropDown
      fontWeight="900"
      fontSize={props.fontSize || "0.7rem"}
      width={props.width || "80px"}
      height={props.height || "30px"}
      options={(() => {
        if (props.options) return [props.initialValue, ...props.options];
        if (props.type === "country")
          return [props.initialValue, ...Object.keys(CountryLocale)];
        if (props.type === "language" || props.type === "hopeLanguage")
          return [props.initialValue, ...Object.values(LocaleLanguage)];
        else return [props.initialValue, ...Object.values(LocaleLanguage)];
      })()}
      backgroundColor={props.backgroundColor || "#06C074"}
      color={props.color || "white"}
      initialValue={props.initialValue}
      search={props.search}
      index={props.index}
      type={props.type}
      setValues={props.setValues}
      value={props.value}
    />
  );
};
export { SelectInfoDropDown };
