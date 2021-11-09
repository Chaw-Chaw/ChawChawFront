import { LanguageLocale, LocaleLanguage } from "../../../constants/LocaleList";
import { DropDown } from "./DropDown";
import { ImEarth } from "react-icons/im";
import { Dispatch, SetStateAction, useContext } from "react";
import styled, { ThemeContext } from "styled-components";

interface ChangeLanguageDropDownProps {
  selectLanguage: string[];
  setSelectLanguage: Dispatch<SetStateAction<string[]>>;
}

const ChangeLanguageDropDown: React.FC<ChangeLanguageDropDownProps> = (
  props
) => {
  const { bodyBackgroundColor, bodyFontColor } = useContext(ThemeContext);
  const initialValue = LanguageLocale[props.selectLanguage[0]].toUpperCase();
  const Languages: string[] = Object.keys(LanguageLocale);
  const options = ["Korean", ...Languages];

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
        type="NORMAL"
        backgroundColor={bodyBackgroundColor}
        color={bodyFontColor}
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
