import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import ChawLogo from "../../../public/Layout/ChawChawLogo.png";

const Logo: React.FC = () => {
  return (
    <Link href="/" passHref>
      <HeaderLogo>
        <Image
          src={ChawLogo}
          alt="ChawChaw 로고"
          width="600px"
          height="140px"
        />
      </HeaderLogo>
    </Link>
  );
};

const HeaderLogo = styled.div`
  display: flex;
  // 드래그 방지
  -webkit-touch-callout: none;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  box-sizing: border-box;
`;
export { Logo };
