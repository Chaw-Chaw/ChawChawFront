import React from "react";
import styled from "styled-components";
import { Logo, ThemeToggle } from "..";
import { useAppSelector } from "../../../hooks/redux";
import HeaderCondition from "./HeaderCondition";
import { MobileHeader } from "./MobileHeader";

const Header: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <HeaderWrapper>
        <LogoFragment>
          <Logo />
          <SchoolHead>{user.school}</SchoolHead>
        </LogoFragment>
        <HeaderComponentsBox>
          <ThemeToggleBox>
            <ThemeToggle />
          </ThemeToggleBox>
          <HeaderCondition />
        </HeaderComponentsBox>
      </HeaderWrapper>
      <MobileHeader />
    </>
  );
};

export default React.memo(Header);

const ThemeToggleBox = styled.div`
  margin: 1rem;
`;
const HeaderWrapper = styled.header`
  @media (max-width: 768px) {
    display: none;
  }
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0px;
  box-sizing: border-box;
  position: fixed;
  z-index: 30;
  top: 0px;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;
const HeaderComponentsBox = styled.div`
  display: flex;
  align-items: center;
`;

const LogoFragment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const SchoolHead = styled.h2`
  margin: 0px;
  padding: 0px;
  font-size: 1.5rem;
`;
