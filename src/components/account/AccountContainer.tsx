import React from "react";
import styled from "styled-components";
import { AccountContainerProps } from "../../types/account";

const AccountContainer: React.FC<AccountContainerProps> = (props) => {
  const title = props.title?.split("`").map((line, index) => {
    return <h3 key={index}>{line}</h3>;
  });
  const subtitle = props.subtitle?.split("`").map((line, index) => {
    return <h4 key={index}>{line}</h4>;
  });
  return (
    <Container width={props.width}>
      <Section>
        {title}
        <Divider />
        {subtitle}
      </Section>
      {props.children}
    </Container>
  );
};

const Container = styled.div<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "500px")};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    width: 450px;
  }
  @media (max-width: 480px) {
    width: 320px;
    margin-bottom: 10px;
  }
  /* margin-bottom: 200px; */
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
  margin: 50px 0px;
  @media (max-width: 480px) {
    margin: 10px 0px;
  }
`;

const Divider = styled.div`
  margin: 20px 0;
`;

export default AccountContainer;
