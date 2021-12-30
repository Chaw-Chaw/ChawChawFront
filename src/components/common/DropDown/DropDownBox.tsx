import styled from "styled-components";
import React, { ReactNode } from "react";

interface InitialBoxProps {
  fontWeight: string;
  fontSize: string;
  width: string;
  height: string;
  backgroundColor: string;
  value: string;
  color: string;
  children?: ReactNode;
}

interface DropDownBoxProps extends InitialBoxProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const MDropDownBox: React.FC<DropDownBoxProps> = (props) => {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (props.onClick) {
      props.onClick(e);
    }
  };
  return (
    <InitialBox
      fontWeight={props.fontWeight}
      fontSize={props.fontSize}
      width={props.width}
      height={props.height}
      onClick={handleClick}
      color={props.color}
      backgroundColor={props.backgroundColor}
      value={props.value}
    >
      {props.children}
      <span>{props.value?.substring(0, 22)}</span>
    </InitialBox>
  );
};

const DropDownBox = React.memo(MDropDownBox);
export { DropDownBox };
export type { DropDownBoxProps, InitialBoxProps };

const InitialBox = styled.div<InitialBoxProps>`
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
  width: ${(props) => props.width};
  box-sizing: border-box;
  height: ${(props) => props.height};
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  svg {
    position: absolute;
    left: 5px;
  }
  font-family: "BMJUA";

  &:hover {
    cursor: pointer;
  }
  // 드래그 방지
  -webkit-touch-callout: none;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
`;
