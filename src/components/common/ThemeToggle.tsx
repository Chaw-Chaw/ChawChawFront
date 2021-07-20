import React, { Children, ReactNode, useContext } from "react";
import Link from "next/link";
import styled, { ThemeContext } from "styled-components";

interface ThemeToggleProps {
  isActive?: boolean;
  onToggle?: () => void;
}

const ToggleWrapper = styled.div`
  width: 50px;
  min-width: 50px;
  height: 25px;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  background: ${(props) =>
    props.theme.id === "light"
      ? props.theme.secondaryColor
      : props.theme.primaryColor};
  align-items: center;
`;

const Notch = styled.div<{ isActive?: boolean }>`
  height: 21px;
  width: 21px;

  background: white;
  border-radius: 50%;
  transition: transform 0.1s linear;
  transform: translate(${(p) => (p.isActive ? "28px" : "1px")});
  text-align: center;
  background: ${(props) =>
    props.theme.id === "light" ? props.theme.primaryColor : "white"};
`;

const ThemeToggle: React.FC<ThemeToggleProps> = (props) => {
  const { id } = useContext(ThemeContext);
  return (
    <ToggleWrapper onClick={props.onToggle}>
      <Notch isActive={props.isActive} />
    </ToggleWrapper>
  );
};

export { ThemeToggle };
