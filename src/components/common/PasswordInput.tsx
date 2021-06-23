import { Input } from ".";
import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

interface PasswordInputProps {
  value: string;
}
const PasswordWrapper = styled.div`
  display: flex;
  ~ div {
    margin-bottom: 8px;
  }
`;

const PasswordInputStyled = styled(Input).attrs(() => ({
  type: "password",
}))`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const ShowButton = styled.div`
  display: flex;
  border: 1px solid rgb(0, 0, 0, 0.2);
  border-left: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  font-size: 1em;
  font-family: "Source Sans Pro";
  margin-bottom: 8px;
  user-select: none;
  box-sizing: border-box;
  height: 40px;
  color: rgb(0, 0, 0, 0.5);
  padding: 10px;
  cursor: pointer;
`;

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <PasswordWrapper>
        <PasswordInputStyled />
        <ShowButton onClick={() => setShowPassword((state) => !state)}>
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </ShowButton>
      </PasswordWrapper>
      <div>{showPassword ? props.value : ""}</div>
    </>
  );
};
export { PasswordInput };
