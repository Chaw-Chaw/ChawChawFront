import React, { Children, ReactNode, useState } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import { BsChevronDown } from "react-icons/bs";
import { ImEarth } from "react-icons/im";

interface DropDownProps {
  fontWeight?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  id?: string;
  disable?: boolean;
  options?: string[];
  Children?: any;
}

interface InitialBoxProps {
  fontWeight?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  color?: string;
  backgroundColor?: string;
  id?: string;
}

interface SelectMenuProps {
  width?: string;
  height?: string;
  isActive?: boolean;
}

// interface;

const InitialBox = styled.div<InitialBoxProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  color: ${(props) => (props.theme.id === "light" ? "black" : "white")};
  :visited {
    background-color: ${(props) => props.theme.primaryColor};
    color: "white";
  }
  background: ${(props) => props.theme.bodyBackgroundColor};
  :hover {
    color: ${(props) => props.theme.primaryColor};
    cursor: pointer;
  }
  :active {
    color: ${(props) => props.theme.visitedColor};
  }
  // 드래그 방지
  -webkit-touch-callout: none;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
`;

const SelectMenu = styled.div<SelectMenuProps>`
  position: absolute;
  width: ${(props) => props.width};
  border-radius: 1rem;
  border: ${(props) =>
    props.theme.id === "light"
      ? "1px solid rgb(0, 0, 0, 0.2)"
      : "1px solid rgb(255, 255, 255, 0.2)"};
  display: ${(props) => (props.isActive ? "flex" : "none")};
  flex-direction: column;
  top: 40px;
  left: 0px;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  color: ${(props) => (props.theme.id === "light" ? "black" : "white")};
  /* box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5); */
`;

const Option = styled.div`
  padding: 4px 8px;
  display: flex;
  background: ${(props) => props.theme.bodyBackgroundColor};
  :hover {
  }
`;
// const;

const DropDown: React.FC<DropDownProps> = (props) => {
  const [value, setValue] = useState("KR");
  const [isActive, setIsActive] = useState(true);
  return (
    <InitialBox
      fontWeight={props.fontWeight}
      fontSize={props.fontSize}
      width={props.width}
      height={props.height}
      id={props.id}
    >
      <SelectMenu width={props.width} height={props.height} isActive={isActive}>
        {props.options?.map((item, index) => {
          return <Option key={index}>{item}</Option>;
        })}
      </SelectMenu>
      {props.Children}
      <span>{value}</span>
      <BsChevronDown />
    </InitialBox>
  );
};

const ChangeLanguageDropDown: React.FC = () => {
  const options = ["KR", "US", "UK"];
  return (
    <DropDown
      fontWeight="600"
      fontSize="1em"
      width="5rem"
      height="2rem"
      options={options}
      Children={<ImEarth />}
    ></DropDown>
  );
};

export { DropDown, ChangeLanguageDropDown };
