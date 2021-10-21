import React, { MouseEventHandler, useState } from "react";
import styled from "styled-components";
import { DropDownBox, DropDownProps } from "./DropDownBox";
import { Option } from "./Option";

interface SelectMenuProps extends DropDownProps {}

const DropDown: React.FC<DropDownProps> = (props) => {
  const [isActive, setIsActive] = useState(false);
  const index = props?.index;
  const option = props.options;

  const saveInfo = (item: string) => {
    if (props.setValues && index !== undefined) {
      props.setValues((preState) => {
        const result = preState;
        result[index] = item;
        return [...result];
      });
    }
  };

  const handleClickDropDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsActive((isActive) => !isActive);
  };

  const handleMouseLeaveDropDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsActive(false);
  };

  return (
    <DropDownBox
      fontWeight={props.fontWeight}
      fontSize={props.fontSize}
      width={props.width}
      height={props.height}
      onClick={handleClickDropDown}
      color={
        props.search && props.initialValue !== props.value
          ? props.backgroundColor
          : props.color
      }
      backgroundColor={
        props.search && props.initialValue !== props.value
          ? props.color
          : props.backgroundColor
      }
      value={props.value}
    >
      <SelectMenu
        width={props.width}
        height={props.height}
        isActive={isActive}
        onMouseLeave={handleMouseLeaveDropDown}
      >
        {option?.map((item: string, index: number) => {
          return <Option key={index} item={item} saveInfo={saveInfo} />;
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
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isActive ? "flex" : "none")};
  flex-direction: column;
  top: 40px;
  left: 0px;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  color: ${(props) => (props.theme.id === "light" ? "black" : "white")};
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
