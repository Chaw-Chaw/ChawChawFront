import styled from "styled-components";
import React from "react";

interface ActiveProps {
  activeType?: string;
}
interface IsActiveProps {
  isActive?: boolean;
}
const StageCircle = styled.div<IsActiveProps>`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: "none";
  background-color: ${(props) =>
    props.isActive ? props.theme.primaryColor : props.theme.secondaryColor};
  text-align: center;
  color: white;
  font-size: 3rem;
  font-weight: 800;
`;

const ContactLine = styled.div<IsActiveProps>`
  width: 50px;
  height: 1px;
  background-color: ${(props) =>
    props.isActive ? props.theme.primaryColor : props.theme.secondaryColor};
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginOrder: React.FC<ActiveProps> = (props) => {
  return (
    <Container>
      <StageCircle isActive={Number(props.activeType) >= 1}>1</StageCircle>
      <ContactLine isActive={Number(props.activeType) >= 2} />
      <StageCircle isActive={Number(props.activeType) >= 2}>2</StageCircle>
      <ContactLine isActive={Number(props.activeType) >= 3} />
      <StageCircle isActive={Number(props.activeType) >= 3}>3</StageCircle>
    </Container>
  );
};

export { LoginOrder };
