import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import { BsChat } from "react-icons/bs";
import { AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";
import { MouseEventHandler, useContext, useState } from "react";
import { AuthContext } from "../../../store/AuthContext";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  CHAT_PAGE_URL,
  PROFILE_PAGE_URL,
  SETTING_PAGE_URL,
} from "../../../constants/pageUrls";
import { useLogin } from "../../../hooks/api/account/useLogin";

const MyImage: React.FC<{ profileImage: string }> = (props) => {
  const [isActive, setIsActive] = useState(false);
  const { logout } = useLogin();
  const router = useRouter();

  const handleClickImage: MouseEventHandler<HTMLImageElement> = (e) => {
    e.preventDefault();
    setIsActive((isActive) => !isActive);
  };
  const handleClickProfile: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    router.push(PROFILE_PAGE_URL);
  };
  const handleClickChat: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    router.push({ pathname: CHAT_PAGE_URL, query: { userId: -1 } });
  };

  const handleClickSetting: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    router.push(SETTING_PAGE_URL);
  };
  const handleClickLogout: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <MyImageBox>
      <Image
        src={`${props.profileImage}`}
        alt="프로필 이미지"
        width="50px"
        height="50px"
        onClick={handleClickImage}
        objectFit="cover"
      />
      <SelectMenu isActive={isActive}>
        <Option onClick={handleClickProfile}>
          <CgProfile />
          <span>프로필</span>
        </Option>
        <Option onClick={handleClickChat}>
          <BsChat />
          <span>채팅창</span>
        </Option>
        <Option onClick={handleClickSetting}>
          <AiOutlineSetting />
          <span>설정</span>
        </Option>
        <Option onClick={handleClickLogout}>
          <AiOutlineLogout />
          <span>로그아웃</span>
        </Option>
      </SelectMenu>
    </MyImageBox>
  );
};

export default MyImage;

const MyImageBox = styled.div`
  margin-left: 10px;
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
  right: 0px;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  color: ${(props) => (props.theme.id === "light" ? "black" : "white")};
  animation: growDown 300ms ease-in-out forwards;
  transform-origin: top center;
  overflow: auto;
  z-index: 100;
  @media (max-width: 768px) {
    width: 125px;
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
  transition: background-color 0.5s;
  &:hover {
    background-color: ${(props) => props.theme.primaryColor};
    color: white;
  }
`;
