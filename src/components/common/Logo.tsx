import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import ChawLogo from "../../../public/Layout/ChawChawLogo.png";

const HeaderLogo = styled.div`
  display: flex;
  // 드래그 방지
`;
const Logo: React.FC = () => {
  return (
    <Link href="/" passHref>
      <a>
        <HeaderLogo>
          <Image
            src={ChawLogo}
            alt="ChawChaw 로고"
            width="500px"
            height="110px"
          />
        </HeaderLogo>
      </a>
    </Link>
  );
};

export { Logo };
