import React, { Children } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";

// const Button: React.FC = ({ children }) => {
//   return <StyleButton>{children}</StyleButton>;
// };
// interface Props extends <HTMLButtonElement> {
//     secondary: boolean;
// }
const Button = styled.button`
  color: white;
  height: 2.25rem;
  border-radius: 20rem;
  background-color: ${(props) => props.theme.primaryColor};
  width: 8rem;
  height: 2.5rem;
  font-weight: 600;
  font-size: 2rem;
  cursor: pointer;

  border: none;
  text-align: center;
  &:disabled {
    background-color: orange;
    color: white;
  }
  @keyframes color-change-2x {
    0% {
      background: ${(props) => props.theme.primaryColor};
    }
    100% {
      background: ${(props) => props.theme.visitedColor};
    }
  }
  /* :hover {
    animation: color-change-2x 500ms linear alternate both;
  } */
  :active {
    animation: color-change-2x 200ms linear alternate both;
  }
`;

export { Button };
