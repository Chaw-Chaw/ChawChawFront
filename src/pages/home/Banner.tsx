import React from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import { Button } from "../../components/common";
import BannerImage from "../../../public/Main/conversation.jpeg";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  position: relative;
  .bannerImage {
    object-fit: contain;
  }
`;

const BannerText = styled.span`
  position: absolute;
  top: 30%;
  left: 10%;
  font-size: 6rem;
  font-weight: 800;
  width: 30%;
  color: black;
  @media (max-width: 1050px) {
    position: absolute;
    top: 30%;
    left: 10%;
    font-size: 4rem;
  }
  @media (max-width: 768px) {
    text-align: center;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-60%, -50%);
    font-size: 3rem;
  }
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
  @media (max-width: 1050px) {
    font-size: 3rem;
    top: 60%;
    left: 35%;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const BannerButton = styled.div`
  position: absolute;
  top: 70%;
  left: 10%;
  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Banner: React.FC = () => {
  return (
    <Container>
      <Image
        src={BannerImage}
        alt="배너 이미지"
        className="bannerImage"
      ></Image>
      <Link href="/post">
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

export default Banner;
