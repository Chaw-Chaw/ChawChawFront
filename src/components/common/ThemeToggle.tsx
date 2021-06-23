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
  background-color: orange;
  width: 8rem;
  height: 2.5rem;
  font-weight: 600;
  font-size: 2rem;
  cursor: pointer;
  /* ${(props) =>
    props.large
      ? css`
          width: 10rem;
        `
      : css`
          width: 8rem;
        `} */
  border: none;
  text-align: center;
  /* &:disabled {
    background-color: orange;
    color: white;
  } */
`;

export { Button };
