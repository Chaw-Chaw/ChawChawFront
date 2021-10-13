import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { LoadingSpinner } from "../common";

const UsageSlide: React.FC<{ title: string; subtitle: string; src: string }> = (
  props
) => {
  const subtitleArr = props.subtitle.split("/n");
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Container>
      <Inner>
        <Title>{props.title}</Title>
        <SubTitleBox>
          {subtitleArr.map((item, index) => {
            return <SubTitle key={index}>{item}</SubTitle>;
          })}
        </SubTitleBox>
        <ImageWrapper>
          <Image
            src={props.src}
            alt="사용소개 이미지"
            width="800"
            height="400"
            // layout="responsive"
            objectFit="contain"
            onLoad={() => {
              setIsLoading(false);
            }}
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
  padding-top: 80px;
  display: flex;
  justify-content: center;
`;

const UsageImageBox = styled.div`
  width: 500px;
  height: 400px;
  background-color: orange;
`;

const Inner = styled.div`
  width: 80%;
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
`;

const SubTitleBox = styled.div`
  margin: 20px 0px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 900px;
  height: 500px;
  border-radius: 20px;
  background-color: #eeeeee;
  position: relative;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  transform: -50%;
`;
