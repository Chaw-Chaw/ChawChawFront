import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { LoadingSpinner } from "../common";

const UsageSlide: React.FC<{ title: string; subtitle: string; src: string }> = (
  props
) => {
  const subtitleArr = props.subtitle.split("/n");
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const subtitle = subtitleArr.map((item) => {
    return <SubTitle key={item}>{item}</SubTitle>;
  });

  return (
    <Container>
      <Inner>
        <Title>{props.title}</Title>
        <SubTitleBox>{subtitle}</SubTitleBox>
        <ImageWrapper>
          <Image
            src={props.src}
            alt="사용소개 이미지"
            width="800"
            height="450"
            objectFit="contain"
            onLoad={handleLoad}
          />
          {isLoading && (
            <LoadingWrapper>
              <LoadingSpinner />
            </LoadingWrapper>
          )}
        </ImageWrapper>
      </Inner>
    </Container>
  );
};

export { UsageSlide };

const Container = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  /* padding-top: 80px; */
  display: flex;
  justify-content: center;
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
`;

const Inner = styled.div`
  width: 80%;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0px;
  padding: 0px;
  margin-top: 30px;
  font-size: 2.5rem;
  color: white;
  text-align: center;
`;

const SubTitle = styled.h2`
  text-align: center;
  margin: 0px;
  padding: 0px;
  margin-top: 5px;
  font-size: 1rem;
  color: white;
  max-width: 800px;
  @media (max-width: 480px) {
    margin: 15px 0px;
  }
`;

const SubTitleBox = styled.div`
  margin: 20px 0px;
  @media (max-width: 480px) {
    margin: 50px 0px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  max-width: 900px;
  max-height: 600px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: #eeeeee;
  position: relative;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  transform: -50%;
`;
