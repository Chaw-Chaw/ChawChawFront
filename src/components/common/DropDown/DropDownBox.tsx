import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface initialBoxProps {
  fontWeight?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  value?: string;
}

interface DropDownProps extends initialBoxProps {
  options?: any;
  color?: string;
  initialValue?: string;
  isActive?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: () => void;
  search?: boolean;
  index?: number;
  type?: string;
  setValues?: Dispatch<SetStateAction<string[]>>;
}

const DropDownBox: React.FC<DropDownProps> = (props) => {
  const clickHander: React.MouseEventHandler<HTMLDivElement> = (e) => {
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
      onClick={clickHander}
      color={props.color}
      backgroundColor={props.backgroundColor}
      value={props.value}
    >
      {props.children}
      <span>{props.value?.substring(0, 22)}</span>
    </InitialBox>
  );
};

export { DropDownBox };
export type { DropDownProps };

const InitialBox = styled.div<initialBoxProps>`
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
  font-family: "BMJUA";

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
