import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { saveSecureLocalStorage } from "../../utils";

const MThemeToggle: React.FC = () => {
  const { id, setTheme } = useContext(ThemeContext);
  const handleClick = () => {
    setTheme();
    saveSecureLocalStorage("displayMode", id === "light" ? "dark" : "light");
  };

  return (
    <ToggleWrapper onClick={handleClick}>
      <Notch isActive={id === "dark"} />
    </ToggleWrapper>
  );
};

const ThemeToggle = React.memo(MThemeToggle);
export { ThemeToggle };

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
