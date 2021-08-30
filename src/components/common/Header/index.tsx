import React, { useContext, useEffect } from "react";
import styled, { ThemeContext } from "styled-components";
import { Logo, ThemeToggle } from "..";
import { ChangeLanguageDropDown } from "../DropDown/ChangeLanguageDropDown";
import { AuthContext } from "../../../store/AuthContext";
import HeaderCondition from "./HeaderCondition";

interface HeaderProps {
  type?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { id, setTheme } = useContext(ThemeContext);
  const { grantRefresh, user } = useContext(AuthContext);

  // useEffect(() => {
  //   grantRefresh();
  // });

  // console.log(a, "user in header");
  return (
    <HeaderWrapper>
      <LogoFragment>
        <Logo />
        {props.type === "post" && <SchoolHead>{user.school}</SchoolHead>}
      </LogoFragment>
      <HeaderComponentsBox>
        <ThemeToggleBox>
          <ThemeToggle isActive={id === "dark"} onToggle={setTheme} />
        </ThemeToggleBox>
        <HeaderCondition type={props.type} />
      </HeaderComponentsBox>
    </HeaderWrapper>
  );
};

export default Header;
export type { HeaderProps };

const ThemeToggleBox = styled.div`
  margin: 1rem;
`;
const HeaderWrapper = styled.header`
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 140px;
  box-sizing: border-box;
  padding: 10px 16px;
  position: sticky;
  z-index: 100;
  top: 0%;
  @media (max-width: 768px) {
    flex-direction: column;
    height: 200px;
  }
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
