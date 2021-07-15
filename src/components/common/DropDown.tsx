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
  options?: string[];
}

interface InitialBoxProps {
  fontWeight?: string;
  fontSize?: string;
  width?: string;
  height?: string;
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
  height: 100px;

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

const Option = styled.div`
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
  const [value, setValue] = useState("KR");
  const [isActive, setIsActive] = useState(false);
  return (
    <InitialBox
      fontWeight={props.fontWeight}
      fontSize={props.fontSize}
      width={props.width}
      height={props.height}
      onClick={() => setIsActive((isActive) => !isActive)}
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
      <BsChevronDown />
    </InitialBox>
  );
};

const ChangeLanguageDropDown: React.FC = (props) => {
  const options = ["KR", "US", "UK"];
  return (
    <DropDown
      fontWeight="600"
      fontSize="1em"
      width="5rem"
      height="2rem"
      options={options}
    >
      <ImEarth />
    </DropDown>
  );
};

export { DropDown, ChangeLanguageDropDown };
