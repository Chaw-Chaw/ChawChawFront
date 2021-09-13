import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import { BsChat } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { useContext, useState } from "react";
import { AuthContext } from "../../../store/AuthContext";
import { useRouter } from "next/router";
import Image from "next/image";

const MyImage: React.FC<{ profileImage: string }> = (props) => {
  const [isActive, setIsActive] = useState(false);
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <MyImageBox>
      <Image
        src={`${props.profileImage}`}
        alt="프로필 이미지"
        width="50px"
        height="50px"
        onClick={(e) => {
          e.preventDefault();
          setIsActive((isActive) => !isActive);
        }}
        objectFit="cover"
      />

      <SelectMenu isActive={isActive}>
        <Option
          onClick={(e) => {
            e.preventDefault();
            router.push("/account/profile");
          }}
        >
          <CgProfile />
          <span>프로필 | 설정</span>
        </Option>
        <Option
          onClick={(e) => {
            e.preventDefault();
            router.push({ pathname: "/chat", query: { userId: -1 } });
          }}
        >
          <BsChat />
          <span>채팅창</span>
        </Option>
        {/* <Option
          onClick={(e) => {
            e.preventDefault();
            router.push("/account/setting");
          }}
        >
          <AiOutlineSetting />
          <span>설정</span>
        </Option> */}
        <Option onClick={logout}>
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
  :hover {
    background-color: ${(props) => props.theme.primaryColor};
    color: white;
  }
`;
