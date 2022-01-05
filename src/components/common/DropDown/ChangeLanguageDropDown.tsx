import { LanguageLocale } from "../../../constants/LocaleList";
import { DropDown } from "./DropDown";
import { ImEarth } from "react-icons/im";
import React, { useContext, useMemo } from "react";
import styled, { ThemeContext } from "styled-components";
import { NOMAL_TYPE } from "../../../constants/profile";
import { ChangeLanguageDropDownProps } from "../../../types/common";

const MChangeLanguageDropDown: React.FC<ChangeLanguageDropDownProps> = (
  props
) => {
  const { bodyBackgroundColor, bodyFontColor } = useContext(ThemeContext);
  const initialValue = LanguageLocale[props.selectLanguage[0]].toUpperCase();
  const options = useMemo(() => ["Korean", ...Object.keys(LanguageLocale)], []);

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
        type={NOMAL_TYPE}
        backgroundColor={bodyBackgroundColor}
        color={bodyFontColor}
      >
        <ImEarth />
      </DropDown>
    </ChangeLanguageDropDownBox>
  );
};
const ChangeLanguageDropDown = React.memo(MChangeLanguageDropDown);

export { ChangeLanguageDropDown };

const ChangeLanguageDropDownBox = styled.div`
  margin-right: 10px;
`;
