import React from "react";
import styled from "styled-components";

interface AccountContainerProps {
  title?: string;
  subtitle?: string;
}

const Container = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 90%;
  }
  margin-bottom: 200px;
`;
const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  h3 {
    font-size: 2rem;
    font-weight: 800;
    margin: 0;
  }
  h4 {
    font-size: 1.3rem;
    font-weight: 300;
    margin: 0;
  }
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Divider = styled.div`
  margin: 20px 0;
  width: 1;
  height: 1;
`;
const AccountContainer: React.FC<AccountContainerProps> = (props) => {
  return (
    <Container>
      <Section>
        {props.title?.split("`").map((line, index) => {
          return <h3 key={index}>{line}</h3>;
        })}
        <Divider />
        {props.subtitle?.split("`").map((line, index) => {
          return <h4 key={index}>{line}</h4>;
        })}
      </Section>
      {props.children}
    </Container>
  );
};

export { AccountContainer };
