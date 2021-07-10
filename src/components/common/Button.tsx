import React, { Children } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";

// const Button: React.FC = ({ children }) => {
//   return <StyleButton>{children}</StyleButton>;
// };
// interface Props extends <HTMLButtonElement> {
//     secondary: boolean;
// }

interface ButtonProps {
  width?: string;
  height?: string;
  primary?: string;
  secondary?: string;
  fontWeight?: string;
  fontSize?: string;
}

const InitialButton = styled.button<ButtonProps>`
  color: ${(props) => {
    if (props.primary) return "white";
    if (props.secondary) return props.theme.primaryColor;
    return "white";
  }};
  height: 2.25rem;
  border-radius: 20rem;
  background-color: ${(props) => {
    if (props.primary) return props.theme.primaryColor;
    if (props.secondary) return "white";
    return props.theme.primaryColor;
  }};
  width: ${(props) => (props.width ? props.width : "8rem")};
  height: ${(props) => (props.height ? props.height : "2.5rem")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "600")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "2rem")};
  cursor: pointer;
  border: none;
  text-align: center;
  &:disabled {
    background-color: ${(props) => props.theme.bodyBackgroundColor};
    color: ${(props) => props.theme.secondaryColor};
  }
  @keyframes color-change-2x {
    0% {
      background: ${(props) => props.theme.primaryColor};
    }
    100% {
      background: ${(props) => props.theme.visitedColor};
    }
  }
  /* :hover {
    animation: color-change-2x 500ms linear alternate both;
  } */
  :active {
    animation: color-change-2x 200ms linear alternate both;
  }
`;

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <InitialButton
      width={props.width}
      height={props.height}
      primary={props.primary}
      secondary={props.secondary}
      fontWeight={props.fontWeight}
      fontSize={props.fontSize}
    >
      {props.children}
    </InitialButton>
  );
};

export { Button };
