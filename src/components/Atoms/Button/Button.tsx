import React, { Children } from "react";
import Link from "next/link";
import styled from "styled-components";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";

type Props = {
  backgroundColor?: string;
  buttonName: string;
  width?: string;
  height?: string;
  children?: React.ReactNode;
};

const Button: React.FC<Props> = (...props) => {
  return (
    <StyleButton backgroundColor={backgroundColor}>
      {buttonName}
      {children}
    </StyleButton>
  );
};

const StyleButton = styled.div`
  color: "green";
  width: "8rem";
  height: "2.25rem";
  border-radius: "20px";
  background-color: "yellow";
  border: "none";
  text-align: "center";
`;

export default Button;
