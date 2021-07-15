import React, { useContext } from "react";
import Link from "next/link";
import styled, { ThemeContext } from "styled-components";
import { Button, Logo, ThemeToggle, ChangeLanguageDropDown } from ".";
import { Head } from "next/document";

interface HeaderProps {
  type?: string;
}
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
`;
const HeaderCondition: React.FC<HeaderProps> = (props) => {
  const headerType = props.type;
  if (headerType === "login") {
    return (
      <Link href="/account/signup/webMailAuth">
        <a>
          <Button>Signup</Button>
        </a>
      </Link>
    );
  }
  if (headerType === "signup") {
    return (
      <Link href="/account/login">
        <a>
          <Button>Login</Button>
        </a>
      </Link>
    );
  }
  if (headerType === "loggedIn") {
    return (
      <Link href="/account/login">
        <a>
          <Button>Login</Button>
        </a>
      </Link>
    );
  }
  return (
    <Link href="/account/login">
      <a>
        <Button>Login</Button>
      </a>
    </Link>
  );
};
const Header: React.FC<HeaderProps> = (props) => {
  const { id, setTheme } = useContext(ThemeContext);
  return (
    <HeaderWrapper>
      <Logo />
      <ChangeLanguageDropDown />
      <ThemeToggleBox>
        <ThemeToggle isActive={id === "dark"} onToggle={setTheme} />
      </ThemeToggleBox>
      <HeaderCondition type={props.type} />
    </HeaderWrapper>
  );
};

export { Header };
