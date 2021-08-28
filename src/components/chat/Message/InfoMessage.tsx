import styled from "styled-components";

const InfoMessage: React.FC = (props) => {
  return (
    <InfoMessageContainer>
      <InfoMessageBox>
        <span>{props.children}</span>
      </InfoMessageBox>
    </InfoMessageContainer>
  );
};

export default InfoMessage;

const InfoMessageContainer = styled.div`
  width: 100%;
  height: 40px;
  padding: 5px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const InfoMessageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20rem;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.secondaryColor};
  span {
    font-size: 0.8rem;
    color: ${(props) => props.theme.primaryColor};
  }
`;
