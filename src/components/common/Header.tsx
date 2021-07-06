import React, { useContext } from "react";
import Link from "next/link";
import styled, { ThemeContext } from "styled-components";
import { Button, Logo, ThemeToggle } from ".";

const Header: React.FC = () => {
  const { id, setTheme } = useContext(ThemeContext);
  return (
    <HeaderWrapper>
      <Logo />
      <ThemeToggleBox>
        <ThemeToggle isActive={id === "dark"} onToggle={setTheme} />
      </ThemeToggleBox>
      <ButtonLogin>Login</ButtonLogin>
    </HeaderWrapper>
  );
};

const ThemeToggleBox = styled.div`
  margin: 1rem;
`;
const HeaderWrapper = styled.div`
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  padding: 0 16px;
  position: fixed;
  top: 0%;

  @media (max-width: 768px) {
    bottom: 0%;
    top: initial;
  }
`;
const ButtonLogin = styled(Button)`
  width: 5rem;
  height: 2rem;
  font-size: 1.2rem;
`;

const ButtonJustStart = styled(Button)`
  width: 20rem;
  height: 5rem;
  font-size: 3.5rem;
`;

export { Header };
