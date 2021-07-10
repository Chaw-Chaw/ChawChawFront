import React from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import { Button } from "../../components/common";
import BannerImage from "../../../public/Main/외국대화.jpeg";
import Link from "next/link";

const Container = styled.div`
  border: none;
  display: flex;
  position: relative;
  width: 100%;
  height: calc(100vh - 140px);
`;

const BannerText = styled.span`
  position: absolute;
  top: 30%;
  left: 10%;
  font-size: 6rem;
  font-weight: 800;
  width: 30%;
  color: black;
`;

const ScrollingText = styled.span`
  position: absolute;
  top: 70%;

  text-align: center;
  font-size: 4rem;
  font-weight: 800;
  width: 100%;
  color: white;
  @keyframes slide-top {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(100px);
    }
    100% {
      transform: translateY(0);
    }
  }
  animation: slide-top 2s infinite;
`;

const BannerButton = styled.div`
  position: absolute;
  top: 70%;
  left: 10%;
`;

const Banner: React.FC = () => {
  return (
    <Container>
      <Image src={BannerImage} alt="배너 이미지" layout="intrinsic"></Image>
      <Link href="/main">
        <a>
          <BannerButton>
            <Button width="16rem" height="5rem" fontSize="2.8rem">
              Just Start
            </Button>
          </BannerButton>
        </a>
      </Link>
      <BannerText>ExChange languages</BannerText>
      <ScrollingText>Scrolling ↓</ScrollingText>
    </Container>
  );
};

export { Banner };
