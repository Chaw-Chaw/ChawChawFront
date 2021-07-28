import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled, { ThemeContext } from "styled-components";
import { Button, Logo, ThemeToggle, ChangeLanguageDropDown } from ".";
import DefaultImage from "../../../public/Layout/default_profile.png";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";
import { BsChat } from "react-icons/bs";

interface HeaderProps {
  type?: string;
}
const ThemeToggleBox = styled.div`
  margin: 1rem;
`;
const HeaderWrapper = styled.div`
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 140px;
  box-sizing: border-box;
  padding: 10px 16px;
  position: fixed;
  z-index: 100;
  top: 0%;
  @media (max-width: 768px) {
    flex-direction: column;
    height: 200px;
  }
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
const ImageBox = styled.div``;

const MyImage: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  return (
    <MyImageBox>
      <Image
        src={DefaultImage}
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
            router.push("/chat");
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
        <Option
          onClick={() => {
            router.push("/");
          }}
        >
          <AiOutlineLogout />
          <span>로그아웃</span>
        </Option>
      </SelectMenu>
    </MyImageBox>
  );
};
const HeaderCondition: React.FC<HeaderProps> = (props) => {
  const headerType = props.type;
  if (headerType === "login") {
    return (
      <Link href="/account/signup/webMailAuth">
        <a>
          <Button>Signup</Button>
        </a>
      </Link>
    );
  }
  if (headerType === "signup") {
    return (
      <Link href="/account/login">
        <a>
          <Button>Login</Button>
        </a>
      </Link>
    );
  }
  if (headerType === "loggedIn") {
    return <MyImage />;
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
  return (
    <HeaderWrapper>
      <Logo />
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
