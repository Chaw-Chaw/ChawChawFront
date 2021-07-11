import React, { useContext } from "react";
import Link from "next/link";
import styled, { ThemeContext } from "styled-components";
import { Button, Logo, ThemeToggle, ChangeLanguageDropDown } from ".";

const ThemeToggleBox = styled.div`
  margin: 1rem;
`;
const HeaderWrapper = styled.div`
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 140px;
  box-sizing: border-box;
  padding: 10px 16px;
  position: fixed;
  z-index: 100;
  top: 0%;

  @media (max-width: 768px) {
    bottom: 0%;
    top: initial;
  }
`;
const Header: React.FC = () => {
  const { id, setTheme } = useContext(ThemeContext);
  return (
    <HeaderWrapper>
      <Logo />
      <ChangeLanguageDropDown />
      <ThemeToggleBox>
        <ThemeToggle isActive={id === "dark"} onToggle={setTheme} />
      </ThemeToggleBox>
      <Button>Login</Button>
    </HeaderWrapper>
  );
};

export { Header };
