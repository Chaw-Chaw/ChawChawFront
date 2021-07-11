import React from "react";
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";

const ArrowFragment = styled.div`
  color: ${(props) => props.theme.primaryColor};
  position: fixed;
  top: 90%;
  left: 50%;
  font-size: 2rem;
  transform: translate(-50%, -50%);
`;

const ArrowBar = styled.div`
  background-color: ${(props) => props.theme.primaryColor};
  width: 0.5rem;
  height: calc(100vh - 300px);
`;

const ArrowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 58%;
  left: 50%;
  font-size: 2rem;
  transform: translate(-50%, -50%);
`;

const ArrowDivider: React.FC = () => {
  return (
    <>
      <ArrowFragment>
        <FaChevronDown />
      </ArrowFragment>
      <ArrowWrapper>
        <ArrowBar />
      </ArrowWrapper>
    </>
  );
};

export { ArrowDivider };
