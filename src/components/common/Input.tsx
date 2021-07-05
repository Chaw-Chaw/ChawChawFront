import styled from "styled-components";

const Input = styled.input`
  padding: 4px 8px;
  border: ${(props) =>
    props.theme.id === "light"
      ? "1px solid rgb(0, 0, 0, 0.2)"
      : "1px solid rgb(255, 255, 255, 0.2)"};
  border-radius: 4px;
  font-size: 1em;
  font-family: "Source Sans Pro";
  margin-bottom: 8px;
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  color: ${(props) =>
    props.theme.id === "light" ? "rgb(0, 0, 0, 0.5)" : "white"};
  :focus {
    border: 2px solid orange;
    outline: none;
  }
  background: ${(props) => props.theme.bodyBackgroundColor};
`;

export { Input };
