import React, { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import ChawLogo from "../../../../public/Layout/ChawChawLogo.png";
import Chaw from "../../../../public/Layout/chaw.png";
import { useRouter } from "next/router";
import { AuthContext } from "../../../store/AuthContext";
import { MAIN_PAGE, POST_PAGE_URL } from "../../../constants/pageUrls";

const Logo: React.FC = () => {
  const router = useRouter();
  const { isLogin } = useContext(AuthContext);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (isLogin && router.pathname !== POST_PAGE_URL) {
      router.push(POST_PAGE_URL);
    } else {
      router.push(MAIN_PAGE);
    }
  };
  return (
    <>
      <HeaderLogo onClick={handleClick}>
        <Image src={ChawLogo} alt="ChawChaw 로고" width={500} height={110} />
      </HeaderLogo>
      <MobileLogo onClick={handleClick}>
        <Image src={Chaw} alt="ChawChaw 로고" width={60} height={60} />
      </MobileLogo>
    </>
  );
};

export { Logo };
const MobileLogo = styled.div`
  cursor: pointer;
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;

const HeaderLogo = styled.div`
  cursor: pointer;
  display: flex;
  @media (max-width: 768px) {
    display: none;
  }
  // 드래그 방지
`;
