import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled, { ThemeContext } from "styled-components";
import { Button, Logo, ThemeToggle, ChangeLanguageDropDown } from ".";
import DefaultImage from "../../../public/Layout/default_profile.png";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { AuthContext } from "../../store/AuthContext";
import { useAlert } from "react-alert";

interface HeaderProps {
  type?: string;
}
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

const MyImageBox = styled.div`
  border-radius: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    cursor: pointer;
    border-radius: 100%;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  }
`;

const SelectMenu = styled.div<{ isActive: boolean }>`
  padding: 4px 0px;
  position: absolute;
  width: 150px;
  border-radius: 10px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isActive ? "flex" : "none")};
  flex-direction: column;
  top: 80px;
  left: 0px;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  color: ${(props) => (props.theme.id === "light" ? "black" : "white")};
  animation: growDown 300ms ease-in-out forwards;
  transform-origin: top center;
  overflow: auto;
  z-index: 100;
  @media (max-width: 500px) {
    width: 125px;
    left: -20px;
  }
  @keyframes growDown {
    0% {
      transform: scaleY(0);
    }
    80% {
      transform: scaleY(1.1);
    }
    100% {
      transform: scaleY(1);
    }
  }
`;

const Option = styled.div`
  cursor: pointer;
  border-radius: 10px;
  padding: 4px 8px;
  display: flex;
  background: ${(props) => props.theme.bodyBackgroundColor};
  height: 40px;
  align-items: center;
  svg {
    font-size: 2rem;
    margin-right: 20px;
  }
  span {
    text-decoration-line: none;
    font-size: 1rem;
  }
  :hover {
    background-color: ${(props) => props.theme.primaryColor};
    color: white;
  }
`;

const MyImage: React.FC<{ profileImage: string }> = ({ profileImage }) => {
  const [isActive, setIsActive] = useState(false);
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <MyImageBox>
      <Image
        src={profileImage}
        alt="프로필 이미지"
        width="50px"
        height="50px"
        onClick={() => setIsActive((isActive) => !isActive)}
        objectFit="cover"
      />
      <SelectMenu isActive={isActive}>
        <Option
          onClick={() => {
            router.push("/account/profile");
          }}
        >
          <CgProfile />
          <span>프로필</span>
        </Option>
        <Option
          onClick={() => {
            router.push({ pathname: "/chat", query: { userId: -1 } });
          }}
        >
          <BsChat />
          <span>채팅창</span>
        </Option>
        <Option
          onClick={() => {
            router.push("/account/setting");
          }}
        >
          <AiOutlineSetting />
          <span>설정</span>
        </Option>
        <Option onClick={logout}>
          <AiOutlineLogout />
          <span>로그아웃</span>
        </Option>
      </SelectMenu>
    </MyImageBox>
  );
};

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
const HeaderCondition: React.FC<HeaderProps> = (props) => {
  const headerType = props.type;
  const { user } = useContext(AuthContext);
  const profileImage =
    user?.imageUrl || `https://d2anzi03nvjlav.cloudfront.net/default.png`;

  if (user?.token) {
    return <MyImage profileImage={profileImage} />;
  }

  if (headerType === "login") {
    return (
      <Link href="/account/signup/webMailAuth">
        <a>
          <Button>Signup</Button>
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
  // const { user } = useContext(AuthContext);
  const [user, setUser] = useState(
    (() => {
      if (typeof window === "undefined") return {};
      const localStorageUser = window.localStorage.getItem("user");
      if (!localStorageUser) return {};
      return JSON.parse(localStorageUser);
    })()
  );
  // console.log(a, "user in header");

  return (
    <HeaderWrapper>
      <LogoFragment>
        <Logo />
        {props.type === "post" && <SchoolHead>{user.school}</SchoolHead>}
      </LogoFragment>
      <HeaderComponentsBox>
        <ChangeLanguageDropDown />
        <ThemeToggleBox>
          <ThemeToggle isActive={id === "dark"} onToggle={setTheme} />
        </ThemeToggleBox>
        <HeaderCondition type={props.type} />
      </HeaderComponentsBox>
    </HeaderWrapper>
  );
};

export { Header };
