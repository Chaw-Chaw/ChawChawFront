import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Logo } from ".";

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <Button>Login</Button>
      <ButtonJustStart>Just Start</ButtonJustStart>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
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

const ButtonJustStart = styled(Button)`
  width: 20rem;
  height: 5rem;
  font-size: 3.5rem;
`;

export { Header };
