import { Input } from "../common";
import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

interface PasswordInputProps {
  name?: string;
  placeholder?: string;
  register?: object;
}

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <PasswordWrapper>
        <PasswordInputStyled
          name={props.name}
          type={showPassword ? "text" : "password"}
          placeholder={props.placeholder}
          {...props.register}
        />
        <ShowButton
          onClick={(e) => {
            e.preventDefault();
            setShowPassword((state) => !state);
          }}
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </ShowButton>
      </PasswordWrapper>
    </>
  );
};
export { PasswordInput };

const PasswordWrapper = styled.div`
  display: flex;
  ~ div {
    margin-bottom: 8px;
  }
  width: 100%;
`;

const PasswordInputStyled = styled(Input)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const ShowButton = styled.div`
  display: flex;
  background: ${(props) => props.theme.bodyBackgroundColor};
  border: ${(props) =>
    props.theme.id === "light"
      ? "1px solid rgb(0, 0, 0, 0.2)"
      : "1px solid rgb(255, 255, 255, 0.2)"};
  border-left: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  font-size: 1em;
  font-family: "Source Sans Pro";
  margin-bottom: 8px;
  user-select: none;
  box-sizing: border-box;
  height: 40px;
  color: ${(props) =>
    props.theme.id === "light" ? "rgb(0, 0, 0, 0.2)" : "white"};
  padding: 10px;
  cursor: pointer;
`;
