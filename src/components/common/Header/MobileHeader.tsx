import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { Logo } from "../Logo";
import { ThemeToggle } from "../ThemeToggle";
import HeaderCondition from "./HeaderCondition";

const MobileHeader: React.FC = () => {
  const { id, setTheme } = useContext(ThemeContext);

  return (
    <MobileHeaderContainer>
      <ThemeToggleBox>
        <ThemeToggle isActive={id === "dark"} onToggle={setTheme} />
      </ThemeToggleBox>
      <Logo />
      <HeaderCondition />
    </MobileHeaderContainer>
  );
};

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
  z-index: 10;
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
