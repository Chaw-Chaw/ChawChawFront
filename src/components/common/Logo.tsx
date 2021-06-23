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
  display: "flex";
`;
export { Logo };
