import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { Logo, ThemeToggle } from "..";
import { ChangeLanguageDropDown } from "../DropDown/ChangeLanguageDropDown";
import { AuthContext } from "../../../store/AuthContext";
import HeaderCondition from "./HeaderCondition";
import { ScreenContext } from "../../../store/ScreenContext";
import { MobileHeader } from "./MobileHeader";
import { ChatContext, MessageType } from "../../../store/ChatContext";
import axios from "axios";

interface HeaderProps {
  type?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { id, setTheme } = useContext(ThemeContext);
  const { user, grantRefresh, accessToken } = useContext(AuthContext);
  const { newMessages, setNewMessages } = useContext(ChatContext);
  const { windowSize } = useContext(ScreenContext);

  const getNewMessages = async () => {
    const response = await axios
      .get("/users/alarm", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .catch((err) => {
        console.log(err, "새로운 메세지 받아오기 실패");
        return err.response;
      });
    if (response.status === 401) {
      grantRefresh();
      return;
    }
    console.log(response, "새로운 메세지 데이터");
    const followMessages = response.data.follows;
    const newMessages = response.data.messages;

    setNewMessages([...followMessages, ...newMessages]);
  };

  useEffect(() => {
    if (!accessToken) return;
    getNewMessages();
    console.log(newMessages, "newMessages, alarm");
  }, []);

  useEffect(() => {
    console.log(newMessages, "newMessages 업데이트");
  }, [JSON.stringify(newMessages)]);

  return (
    <>
      {windowSize > 768 ? (
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
      ) : (
        <MobileHeader />
      )}
    </>
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
