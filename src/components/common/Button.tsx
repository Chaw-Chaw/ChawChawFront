import styled from "styled-components";
import CSS from "csstype";

interface ButtonProps {
  width?: string;
  height?: string;
  primary?: boolean;
  secondary?: boolean;
  fontWeight?: string;
  fontSize?: string;
  onClick?: () => void;
}

const Button = styled.button<ButtonProps>`
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
  /* border: ${(props) =>
    props.secondary ? `1px solid ${props.theme.primaryColor}` : "none"}; */
  border: 1px solid ${(props) => props.theme.primaryColor};
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
  @keyframes color-change-2x {
    0% {
      background: ${(props) => props.theme.primaryColor};
    }
    100% {
      background: ${(props) => props.theme.visitedColor};
    }
  }
  :active {
    animation: color-change-2x 200ms linear alternate both;
  }
`;

const UpdateButton = styled.button`
  font-size: 1rem;
  color: ${(props) => props.theme.primaryColor};
  border: none;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  cursor: pointer;
  margin-right: auto;
`;

export { Button, UpdateButton };
