import { Section } from "./components/Section";
import { ImageSection } from "./components/ImageSection";
import { ArrowDivider } from "./components/ArrowDivider";
import styled, { css } from "styled-components";
import ProfileSectionImage from "../../../public/Main/프로필.png";
import PostingSectionImage from "../../../public/Main/포스팅.jpeg";
import ChattingSectionImage from "../../../public/Main/채팅.png";
import { useState, useRef, useEffect } from "react";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  @keyframes slide-in-bottom {
    0% {
      -webkit-transform: translateY(1000px);
      transform: translateY(1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }
  .slide-in-bottom {
    -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
    animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
`;

const ScrollBanner: React.FC = () => {
  //   const [wrapper1Display, setWrapper1Display] = useState(false);
  //   const target = useRef<HTMLDivElement>(null);
  //   const revealSection: IntersectionObserverCallback = function (
  //     entries,
  //     observer
  //   ) {
  //     const [entry] = entries;

  //     if (!entry.isIntersecting) return;
  //     setWrapper1Display((display) => !display);
  //     observer.unobserve(entry.target);
  //   };

  //   const sectionObserver = new IntersectionObserver(revealSection, {
  //     root: null,
  //     threshold: 0.15,
  //   });

  //   sectionObserver.observe(target.current as Element);

  return (
    <Container>
      <Wrapper>
        {/* <ArrowDivider /> */}
        <ImageSection src={ProfileSectionImage} alt={"프로필섹션이미지"} />
        <Section
          icon="🤳"
          title="Profile"
          subtitle="어떤 사진이든`여러분의 프로필을 올리세요"
          color="#911E93"
          content="
          여러분의 프로필이 곧 여러분의 포스팅이 됩니다.`
          매력있는 사진으로 원하는 언어를 주고 받으세요.원하는 언어와 국적, 관심있을 소개글로`
          ‘나’ 를 어필해 보세요
          "
          //   ref={target}
        />
      </Wrapper>

      <Wrapper>
        <Section
          icon="📮"
          title="Posting"
          subtitle="프로필을 공개하세요`
          여러분의 포스팅 조회가 많을수록`
          매력도가 증가합니다."
          color="#EF2121"
          content="
          여러분의 프로필이 곧 여러분의 포스팅이 됩니다.`
          매력있는 사진으로 원하는 언어를 주고 받으세요.`
          원하는 언어와 국적, 관심있을 소개글로` 
          ‘나’ 를 어필해 보세요
          "
        />
        <ImageSection src={PostingSectionImage} alt={"포스팅섹션이미지"} />
      </Wrapper>
      <Wrapper>
        <ImageSection src={ChattingSectionImage} alt={"채팅섹션이미지"} />
        <Section
          icon="📱"
          title="Chat"
          subtitle="상대방에게 대화를 요청해보세요`분명 새로운 언어의 시작이 될거에요."
          color="#1E9323"
          content="
          여러분의 프로필이 곧 여러분의 포스팅이 됩니다.`
          매력있는 사진으로 원하는 언어를 주고 받으세요. `
          
          원하는 언어와 국적, 관심있을 소개글로 `
          ‘나’ 를 어필해 보세요`
          "
        />
      </Wrapper>
    </Container>
  );
};

export { ScrollBanner };
