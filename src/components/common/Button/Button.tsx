import styled from "styled-components";

interface ButtonProps {
  width?: string;
  height?: string;
  primary?: boolean;
  secondary?: boolean;
  fontWeight?: string;
  fontSize?: string;
}

const Button = styled.button<ButtonProps>`
  padding: 0px;
  font-family: "BMJUA";
  color: ${(props) => {
    if (props.primary) return "white";
    if (props.secondary) return props.theme.primaryColor;
    return "white";
  }};
  border-radius: 20rem;
  background-color: ${(props) => {
    if (props.primary) return props.theme.primaryColor;
    if (props.secondary) return props.theme.bodyBackgroundColor;
    return props.theme.primaryColor;
  }};
  /* border: 1px solid ${(props) => props.theme.primaryColor}; */
  border: none;
  width: ${(props) => (props.width ? props.width : "6rem")};
  height: ${(props) => (props.height ? props.height : "2rem")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "600")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1rem")};
  cursor: pointer;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  text-align: center;
  &:disabled {
    background-color: ${(props) => props.theme.bodyBackgroundColor};
    color: ${(props) => props.theme.secondaryColor};
  }

  transition: background-color 0.5s;

  &:hover {
    background-color: ${(props) => props.theme.visitedColor};
    color: white;
  }
`;

export { Button };
