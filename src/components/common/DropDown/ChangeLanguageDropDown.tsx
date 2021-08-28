import { LanguageLocale } from "../LocaleList";
import { DropDown } from "./DropDown";
import { ImEarth } from "react-icons/im";

const ChangeLanguageDropDown: React.FC = (props) => {
  const localeList = Object.values(LanguageLocale)
    .map((item: any) => item.toUpperCase())
    .sort();

  return (
    <DropDown
      fontWeight="600"
      fontSize="1em"
      width="80px"
      height="30px"
      options={localeList}
      initialValue="KR"
    >
      <ImEarth />
    </DropDown>
  );
};

export { ChangeLanguageDropDown };
