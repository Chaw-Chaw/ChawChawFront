import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Logo } from ".";

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <Button disabled>Login</Button>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 140px;
  box-sizing: border-box;
  padding: 0 16px;
  position: fixed;
  top: 0%;
`;

export { Header };
