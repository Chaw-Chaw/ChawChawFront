import React, { MouseEventHandler, SetStateAction, useState } from "react";
import { useAlert } from "react-alert";
import styled from "styled-components";
import { DropDownBox, InitialBoxProps } from "./DropDownBox";
import { Option } from "./Option";

interface DropDownProps extends InitialBoxProps {
  options: string[];
  initialValue: string;
  index: number;
  type: "SEARCH" | "NORMAL";
  setValues: React.Dispatch<SetStateAction<string[]>>;
}

const DropDown: React.FC<DropDownProps> = (props) => {
  const [isActive, setIsActive] = useState(false);
  const index = props?.index;
  const option = props.options;
  const message = useAlert();

  const saveInfo = (item: string) => {
    if (props.setValues && index !== undefined) {
      props.setValues((preState) => {
        const result = preState;
        if (result.includes(item)) {
          message.info("이미 같은 값을 선택하셨습니다.");
          return result;
        }
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

  const options = option.map((item: string) => {
    return <Option key={item} item={item} saveInfo={saveInfo} />;
  });

  return (
    <DropDownBox
      fontWeight={props.fontWeight}
      fontSize={props.fontSize}
      width={props.width}
      height={props.height}
      onClick={handleClickDropDown}
      color={
        props.type === "SEARCH" && props.initialValue !== props.value
          ? props.backgroundColor
          : props.color
      }
      backgroundColor={
        props.type === "SEARCH" && props.initialValue !== props.value
          ? props.color
          : props.backgroundColor
      }
      value={props.value}
    >
      <SelectMenu
        width={props.width}
        isActive={isActive}
        onMouseLeave={handleMouseLeaveDropDown}
      >
        {options}
      </SelectMenu>
      {props.children}
    </DropDownBox>
  );
};

export { DropDown };
export type { DropDownProps };

const SelectMenu = styled.div<{ width: string; isActive: boolean }>`
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
  color: ${(props) => props.theme.bodyFontColor};
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
