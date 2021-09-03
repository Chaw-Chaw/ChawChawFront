import React, { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import ChawLogo from "../../../public/Layout/ChawChawLogo.png";
import Chaw from "../../../public/Layout/ChawLogo.png";
import { ScreenContext } from "../../store/ScreenContext";

const Logo: React.FC = () => {
  const { windowSize } = useContext(ScreenContext);

  return (
    <Link href="/" passHref>
      <a>
        <HeaderLogo>
          <Image
            src={windowSize > 768 ? ChawLogo : Chaw}
            alt="ChawChaw 로고"
            width={windowSize > 768 ? "500px" : "174px"}
            height={windowSize > 768 ? "110px" : "60px"}
          />
        </HeaderLogo>
      </a>
    </Link>
  );
};

export { Logo };

const HeaderLogo = styled.div`
  display: flex;
  // 드래그 방지
`;
