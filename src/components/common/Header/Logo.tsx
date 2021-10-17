import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import ChawLogo from "../../../../public/Layout/ChawChawLogo.png";
import Chaw from "../../../../public/Layout/chaw.png";

const Logo: React.FC = () => {
  return (
    <Link href="/post" passHref>
      <a>
        <HeaderLogo>
          <Image src={ChawLogo} alt="ChawChaw 로고" width={500} height={110} />
        </HeaderLogo>
        <MobileLogo>
          <Image src={Chaw} alt="ChawChaw 로고" width={60} height={60} />
        </MobileLogo>
      </a>
    </Link>
  );
};

export { Logo };
const MobileLogo = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;

const HeaderLogo = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: none;
  }
  // 드래그 방지
`;
