import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import styled from "styled-components";

const PageButton: React.FC<{
  pageNum: number;
  currentNum: number;
  setSelectedPageNumber: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    props.setSelectedPageNumber(props.pageNum);
  };
  return (
    <PageButtonBox
      onClick={handleClick}
      pageNum={props.pageNum}
      currentNum={props.currentNum}
    >
      {props.pageNum}
    </PageButtonBox>
  );
};

export { PageButton };

const PageButtonBox = styled.button<{ pageNum: number; currentNum: number }>`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 100%;
  color: ${(props) =>
    props.currentNum === props.pageNum ? "white" : props.theme.bodyFontColor};
  font-family: "BMJUA";
  background: ${(props) =>
    props.currentNum === props.pageNum
      ? `${props.theme.primaryColor}`
      : "none"};
  transition: background-color 0.5s;
  &:hover {
    background-color: ${(props) => props.theme.visitedColor};
    color: white;
  }
`;
