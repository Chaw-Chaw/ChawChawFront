import { CountryLocale, LocaleLanguage } from "../LocaleList";
import { DropDown } from "./DropDown";
import { DropDownProps } from "./DropDownBox";

interface SelectInfoDropDownProps extends DropDownProps {}

const SelectInfoDropDown: React.FC<SelectInfoDropDownProps> = (props) => {
  const countryList = [props.initialValue, ...Object.keys(CountryLocale)];
  const languageList = [props.initialValue, ...Object.values(LocaleLanguage)];

  return (
    <DropDown
      fontWeight="900"
      fontSize={props.fontSize ? props.fontSize : "0.7rem"}
      width={props.width ? props.width : "80px"}
      height={props.height ? props.height : "30px"}
      options={(() => {
        if (props.options) return props.options;
        if (props.type === "country") return countryList;
        if (props.type === "language" || props.type === "hopeLanguage")
          return languageList;
        else return countryList;
      })()}
      backgroundColor={
        props.backgroundColor ? props.backgroundColor : "#06C074"
      }
      color={props.color ? props.color : "white"}
      initialValue={(() => {
        if (props.initialValue) return props.initialValue;
        if (props.type === "country") return "Select Country";
        if (props.type === "language" || props.type === "hopeLanguage")
          return "Select Language";
        else return "Select";
      })()}
      postOrder={props.postOrder}
      index={props.index}
      type={props.type}
      setValues={props.setValues}
    />
  );
};
export { SelectInfoDropDown };
