import React, { useContext, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { Button } from "../../components/common";
import BannerImage from "../../../public/Main/conversation.jpeg";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const Banner: React.FC = () => {
  const [cookies] = useCookies(["accessToken"]);
  const router = useRouter();
  return (
    <Container>
      <Image src={BannerImage} alt="배너 이미지" objectFit="cover" />
      <BannerButton>
        <Button
          width="16rem"
          height="5rem"
          fontSize="2.8rem"
          onClick={(e) => {
            e.preventDefault();
            if (cookies.accessToken) {
              router.push("/post");
            } else {
              router.push("/account/login");
            }
          }}
        >
          Just Start
        </Button>
      </BannerButton>
      <BannerText>ExChange languages</BannerText>
      <ScrollingText>{"Scrolling ⬇️"}</ScrollingText>
    </Container>
  );
};

export default Banner;

const Container = styled.div`
  display: flex;
  position: relative;
`;

const BannerText = styled.span`
  position: absolute;
  top: 30%;
  left: 10%;
  font-size: 6rem;
  font-weight: 800;
  width: 30%;
  color: black;
  @media (max-width: 1000px) {
    position: absolute;
    top: 30%;
    left: 10%;
    font-size: 4rem;
  }
  @media (max-width: 768px) {
    text-align: center;
    left: 50%;
    transform: translate(-60%, -50%);
    font-size: 3rem;
  }
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

const ScrollingText = styled.span`
  position: absolute;
  top: 70%;
  text-align: center;
  font-size: 3rem;
  text-shadow: 1px 1px 2px ${(props) => props.theme.primaryColor};
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
  @media (max-width: 1000px) {
    font-size: 2rem;
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
    button {
      height: 2.5rem;
      width: 9rem;
      font-size: 1.2rem;
    }
  }
`;
