import React, { useState } from "react";
import styled from "styled-components";
import { DropDownBox, DropDownProps } from "./DropDownBox";

interface SelectMenuProps extends DropDownProps {}

const DropDown: React.FC<DropDownProps> = (props) => {
  // const [value, setValue] = useState(props.initialValue);
  const [isActive, setIsActive] = useState(false);
  const index = props?.index;
  const option = props.options;
  const setInfo = (item: string) => {
    if (props.setValues && index !== undefined) {
      props.setValues((preState) => {
        const result = preState;
        result[index] = item;
        return [...result];
      });
    }
  };

  console.log(props.initialValue, "initvalue", props.value, "value");

  return (
    <DropDownBox
      fontWeight={props.fontWeight}
      fontSize={props.fontSize}
      width={props.width}
      height={props.height}
      onClick={(e) => {
        e.preventDefault();
        setIsActive((isActive) => !isActive);
      }}
      onMouseLeave={() => setIsActive(false)}
      color={
        props.postOrder && props.initialValue !== props.value
          ? props.backgroundColor
          : props.color
      }
      backgroundColor={
        props.postOrder && props.initialValue !== props.value
          ? props.color
          : props.backgroundColor
      }
      value={props.value}
    >
      <SelectMenu
        width={props.width}
        height={props.height}
        isActive={isActive}
        onMouseLeave={() => setIsActive(false)}
      >
        {option?.map((item: string, index: number) => {
          return (
            <Option
              key={index}
              onClick={() => {
                if (item) {
                  // setValue(item);
                  setInfo(item);
                }
              }}
            >
              {item}
            </Option>
          );
        })}
      </SelectMenu>
      {props.children}
    </DropDownBox>
  );
};

export { DropDown };

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
  max-height: 200px;
  z-index: 100;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
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
