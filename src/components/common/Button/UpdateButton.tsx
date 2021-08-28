import styled from "styled-components";

const UpdateButton = styled.button`
  font-family: "BMJUA";
  font-size: 1rem;
  color: ${(props) => props.theme.primaryColor};
  border: none;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  cursor: pointer;
  margin-right: auto;
`;

export { UpdateButton };
