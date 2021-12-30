import styled from "styled-components";
import React from "react";
import { FIRST_STAGE, SECOND_STAGE } from "../../constants";

interface ActiveProps {
  activeType?: string;
}
interface IsActiveProps {
  isActive?: boolean;
}

const SignupOrder: React.FC<ActiveProps> = (props) => {
  return (
    <Container>
      <StageCircle isActive={Number(props.activeType) >= FIRST_STAGE}>
        <div>1</div>
      </StageCircle>
      <ContactLine isActive={Number(props.activeType) >= SECOND_STAGE} />
      <StageCircle isActive={Number(props.activeType) >= SECOND_STAGE}>
        <div>2</div>
      </StageCircle>
    </Container>
  );
};

export default React.memo(SignupOrder);

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
  display: flex;
  justify-content: center;
  align-items: center;
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
