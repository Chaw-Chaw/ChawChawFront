import React from "react";
import styled from "styled-components";

interface ThemeToggleProps {
  isActive?: boolean;
  onToggle?: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = (props) => {
  return (
    <ToggleWrapper onClick={props.onToggle}>
      <Notch isActive={props.isActive} />
    </ToggleWrapper>
  );
};

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
  transform: translate(${(props) => (props.isActive ? "28px" : "1px")});
  text-align: center;
  background: ${(props) =>
    props.theme.id === "light" ? props.theme.primaryColor : "white"};
`;

export { ThemeToggle };
