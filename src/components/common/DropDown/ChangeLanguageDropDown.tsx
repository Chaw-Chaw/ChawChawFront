import { LanguageLocale, LocaleLanguage } from "../LocaleList";
import { DropDown } from "./DropDown";
import { ImEarth } from "react-icons/im";
import { AuthContext } from "../../../store/AuthContext";
import { Dispatch, SetStateAction, useContext } from "react";
import styled from "styled-components";

interface ChangeLanguageDropDownProps {
  selectLanguage: string[];
  setSelectLanguage: Dispatch<SetStateAction<string[]>>;
}

const ChangeLanguageDropDown: React.FC<ChangeLanguageDropDownProps> = (
  props
) => {
  const initialValue = LanguageLocale[props.selectLanguage[0]].toUpperCase();
  const { user } = useContext(AuthContext);
  const myHopeLanguages = user.hopeLanguage
    ? ["ko", ...user.hopeLanguage]
    : ["ko"];
  const options = myHopeLanguages.map((item) => LocaleLanguage[item]);

  return (
    <ChangeLanguageDropDownBox>
      <DropDown
        fontWeight="600"
        fontSize="1em"
        width="70px"
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
  margin-bottom: 10px;
  margin-left: auto;
`;
