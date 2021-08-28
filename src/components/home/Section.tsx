import React, { RefObject } from "react";
import styled from "styled-components";

interface SectionProps {
  icon?: string;
  title?: string;
  subtitle?: string;
  color?: string;
  content?: string;
  ref?: RefObject<HTMLDivElement>;
}

const Section: React.FC<SectionProps> = (props) => {
  return (
    <Wrapper ref={props.ref}>
      <IconBox>{props.icon}</IconBox>
      <Title>{props.title}</Title>
      {props.subtitle?.split("`").map((line, index) => {
        return (
          <Subtitle key={index} color={props.color}>
            {line}
            <br />
          </Subtitle>
        );
      })}
      <Divider />
      {props.content?.split("`").map((line, index) => {
        return (
          <Content key={index}>
            {line}
            <br />
          </Content>
        );
      })}
    </Wrapper>
  );
};

export { Section };

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 50px 50px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 70%;
  }
`;

const IconBox = styled.div`
  border: 1px solid ${(props) => props.theme.secondaryColor};
  border-radius: 20px;
  width: 100px;
  height: 100px;
  background: white;
  margin-bottom: 40px;
  text-align: center;
  font-size: 4rem;
`;

const Title = styled.h2`
  font-size: 5rem;
  font-weight: 800;
  @media (max-width: 500px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.span`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(props) => props.color};
  white-space: pre-wrap;
  -webkit-text-stroke-width: 0.2px;
  -webkit-text-stroke-color: white;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const Content = styled.span`
  font-size: 1.5rem;
  font-weight: 400;
  white-space: pre-wrap;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const Divider = styled.div`
  margin: 10px 0px;
`;
