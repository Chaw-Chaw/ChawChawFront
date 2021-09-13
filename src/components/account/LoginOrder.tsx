import styled from "styled-components";

interface ActiveProps {
  activeType?: string;
}
interface IsActiveProps {
  isActive?: boolean;
}

const LoginOrder: React.FC<ActiveProps> = (props) => {
  return (
    <Container>
      <StageCircle isActive={Number(props.activeType) >= 1}>
        <div>1</div>
      </StageCircle>
      <ContactLine isActive={Number(props.activeType) >= 2} />
      <StageCircle isActive={Number(props.activeType) >= 2}>
        <div>2</div>
      </StageCircle>
    </Container>
  );
};

export default LoginOrder;

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
