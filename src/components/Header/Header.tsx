import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Logo from "../Logo/Logo";
import Button from "../Atoms/Button/Button";

const Header: React.FC = () => {
  return (
    <Container>
      <Logo />
      <Button buttonName="Login" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%auto;
`;

export default Header;
