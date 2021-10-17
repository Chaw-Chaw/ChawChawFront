import { LanguageLocale, LocaleLanguage } from "../LocaleList";
import { DropDown } from "./DropDown";
import { ImEarth } from "react-icons/im";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface ChangeLanguageDropDownProps {
  selectLanguage: string[];
  setSelectLanguage: Dispatch<SetStateAction<string[]>>;
}

const ChangeLanguageDropDown: React.FC<ChangeLanguageDropDownProps> = (
  props
) => {
  const initialValue = LanguageLocale[props.selectLanguage[0]].toUpperCase();
  const Languages: string[] = Object.values(LanguageLocale);
  const myHopeLanguages = ["ko", ...Languages];
  const options = myHopeLanguages.map((item) => LocaleLanguage[item]);

  return (
    <ChangeLanguageDropDownBox>
      <DropDown
        fontWeight="600"
        fontSize="1em"
        width="110px"
        height="30px"
        options={options}
        initialValue={initialValue}
        setValues={props.setSelectLanguage}
        value={initialValue}
        index={0}
      >
        <ImEarth />
      </DropDown>
    </ChangeLanguageDropDownBox>
  );
};

export { ChangeLanguageDropDown };

const ChangeLanguageDropDownBox = styled.div`
  margin-right: 10px;
`;
