import React, { MouseEventHandler, useState } from "react";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import styled from "styled-components";

const MToggleItem: React.FC<{ title: string; children: React.ReactNode }> = (
  props
) => {
  const [isopen, setIsopen] = useState(true);
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsopen((pre) => !pre);
  };

  return (
    <ToggleItemContainer>
      <ToggleItemBox onClick={handleClick}>
        {isopen ? <IoIosArrowDropdownCircle /> : <IoIosArrowDroprightCircle />}
        <ToggleItemTitle>{props.title}</ToggleItemTitle>
      </ToggleItemBox>
      {isopen && (
        <ToggleListItemContainer>{props.children}</ToggleListItemContainer>
      )}
    </ToggleItemContainer>
  );
};

const ToggleItem = React.memo(MToggleItem);
export { ToggleItem };
const ToggleItemContainer = styled.div`
  margin-top: 15px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
  svg {
    font-size: 20px;
  }
`;

const ToggleItemBox = styled.div`
  display: flex;
`;
const ToggleItemTitle = styled.span`
  margin-left: 5px;
  font-size: 20px;
`;

const ToggleListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  font-size: 17px;
  @keyframes growDown {
    0% {
      transform: scaleY(0);
    }
    80% {
      transform: scaleY(1.1);
    }
    100% {
      transform: scaleY(1);
    }
  }
  animation: growDown 300ms ease-in-out forwards;
  transform-origin: top center;
`;
