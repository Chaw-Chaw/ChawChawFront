import React, { Children } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";

interface ButtonProps {
  width?: string;
  height?: string;
  primary?: boolean;
  secondary?: boolean;
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
    if (props.secondary) return props.theme.bodyBackgroundColor;
    return props.theme.primaryColor;
  }};
  /* border: ${(props) =>
    props.secondary ? `1px solid ${props.theme.primaryColor}` : "none"}; */
  border: 1px solid ${(props) => props.theme.primaryColor};
  width: ${(props) => (props.width ? props.width : "6rem")};
  height: ${(props) => (props.height ? props.height : "2rem")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "600")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1rem")};
  cursor: pointer;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
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
