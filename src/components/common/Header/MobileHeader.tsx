import React from "react";
import styled from "styled-components";
import { Logo } from "./Logo";
import { ThemeToggle } from "../ThemeToggle";
import HeaderCondition from "./HeaderCondition";

const MMobileHeader: React.FC = () => {
  return (
    <MobileHeaderContainer>
      <ThemeToggleBox>
        <ThemeToggle />
      </ThemeToggleBox>
      <Logo />
      <HeaderCondition />
    </MobileHeaderContainer>
  );
};

const MobileHeader = React.memo(MMobileHeader);
export { MobileHeader };

const MobileHeaderContainer = styled.div`
  position: fixed;
  top: 0px;
  background-color: ${(props) => props.theme.primaryColor};
  align-items: center;
  display: none;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  padding: 5px 16px;
  z-index: 30;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;
const ThemeToggleBox = styled.div`
  margin: 1rem;
  border: 1px solid white;
  border-radius: 25px;
`;
