import React, { useState } from "react";
import styled from "styled-components";
import { ImEarth } from "react-icons/im";
import { LocaleList, CountryEmojiNames, LanguageNames } from "../common";

interface DropDownProps {
  fontWeight?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  options?: string[];
  color?: string;
  backgroundColor?: string;
  initialValue?: string;
}

interface SelectMenuProps extends DropDownProps {
  isActive?: boolean;
}

// interface;

const InitialBox = styled.div<DropDownProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${(props) => props.fontWeight};
  padding: 4px 8px;
  border-radius: 10rem;
  border: none;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  font-size: ${(props) => props.fontSize};
  font-family: "Source Sans Pro";
  width: ${(props) => props.width};
  box-sizing: border-box;
  height: ${(props) => props.height};
  color: ${(props) => {
    if (props.color) return props.color;
    if (props.theme.id === "light") return "black";
    else {
      return "white";
    }
  }};
  background-color: ${(props) => {
    if (props.backgroundColor) return props.backgroundColor;
    else {
      props.theme.bodyBackgroundColor;
    }
  }};
  svg {
    position: absolute;
    left: 5px;
  }

  :hover {
    cursor: pointer;
  }

  // 드래그 방지
  -webkit-touch-callout: none;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
`;

const SelectMenu = styled.div<SelectMenuProps>`
  padding: 4px 0px;
  position: absolute;
  width: ${(props) => props.width};
  border-radius: 10px;
  /* border: ${(props) =>
    props.theme.id === "light"
      ? "1px solid rgb(0, 0, 0, 0.2)"
      : "1px solid rgb(255, 255, 255, 0.2)"}; */
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isActive ? "flex" : "none")};
  flex-direction: column;
  top: 40px;
  left: 0px;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  color: ${(props) => (props.theme.id === "light" ? "black" : "white")};
  /* box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5); */

  animation: growDown 300ms ease-in-out forwards;
  transform-origin: top center;
  overflow: auto;
  height: 200px;
  z-index: 100;

  @keyframes growDown {
    0% {
      transform: scaleY(0);
    }
    80% {
      transform: scaleY(1.1);
    }
    100% {
      transform: scaleY(1);
    }
  }
`;

const Option = styled.div<SelectMenuProps>`
  border-radius: 10px;
  padding: 4px 8px;
  display: flex;
  background: ${(props) => props.theme.bodyBackgroundColor};
  :hover {
    background-color: ${(props) => props.theme.primaryColor};
    color: white;
  }
`;
// const;

const DropDown: React.FC<DropDownProps> = (props) => {
  const [value, setValue] = useState(props.initialValue);
  const [isActive, setIsActive] = useState(false);

  return (
    <InitialBox
      fontWeight={props.fontWeight}
      fontSize={props.fontSize}
      width={props.width}
      height={props.height}
      onClick={() => setIsActive((isActive) => !isActive)}
      color={props.color}
      backgroundColor={props.backgroundColor}
    >
      <SelectMenu width={props.width} height={props.height} isActive={isActive}>
        {props.options?.map((item, index) => {
          return (
            <Option key={index} onClick={() => setValue(item)}>
              {item}
            </Option>
          );
        })}
      </SelectMenu>
      {props.children}
      <span>{value}</span>
    </InitialBox>
  );
};

const ChangeLanguageDropDown: React.FC = (props) => {
  const localeList = Object.keys(LocaleList);

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

const SelectInfoDropDown: React.FC<{
  type?: string;
  color?: string;
}> = (props) => {
  const countryList = CountryEmojiNames;
  const languageList = LanguageNames;
  return (
    <DropDown
      fontWeight="900"
      fontSize="0.7rem"
      width="80px"
      height="30px"
      options={props.type === "country" ? countryList : languageList}
      backgroundColor={props.color ? props.color : "#06C074"}
      color="white"
      initialValue={
        props.type === "country" ? "Select Country" : "Select Language"
      }
    />
  );
};

export { DropDown, ChangeLanguageDropDown, SelectInfoDropDown };
