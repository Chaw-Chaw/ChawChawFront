import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { PagenationInfoType } from "../../../../types/manage";

import { PageButton } from "./PageButton";

const Pagenation: React.FC<{
  pagenationInfo: PagenationInfoType;
  selectedPageNumber: number;
  setSelectedPageNumber: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const [totalPageArr, setTotalPageArr] = useState<number[]>([0]);
  const pagenationSizeArr = Array.from(
    {
      length: props.pagenationInfo.endPage - props.pagenationInfo.startPage + 1,
    },
    (_, i) => i + props.pagenationInfo.startPage
  );

  const handleClickMoveLast: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (props.pagenationInfo.curPage === totalPageArr.length) return;
    props.setSelectedPageNumber(totalPageArr.length);
  };
  const handleClickMoveNext: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!props.pagenationInfo.isNext) return;
    props.setSelectedPageNumber(props.pagenationInfo.endPage + 1);
  };
  const handleClickMoveFirst: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (props.pagenationInfo.curPage === 1) return;
    props.setSelectedPageNumber(1);
  };
  const handleClickMovePrevious: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!props.pagenationInfo.isPrevious) return;
    props.setSelectedPageNumber(props.pagenationInfo.startPage - 1);
  };

  const fullSizeButtons = totalPageArr.map((item) => {
    return (
      <PageButton
        key={item}
        pageNum={item}
        currentNum={props.pagenationInfo.curPage}
        setSelectedPageNumber={props.setSelectedPageNumber}
      />
    );
  });

  const remainSizeButtons = pagenationSizeArr.map((item) => {
    return (
      <PageButton
        key={item}
        pageNum={item}
        currentNum={props.pagenationInfo.curPage}
        setSelectedPageNumber={props.setSelectedPageNumber}
      />
    );
  });
  useEffect(() => {
    // pagenation 이 초기상태라면 넘김
    if (props.pagenationInfo.curPage === 0) return;
    const totalPageCount = Math.ceil(props.pagenationInfo.totalCnt / 10);
    setTotalPageArr(Array.from({ length: totalPageCount }, (_, i) => i + 1));
  }, [JSON.stringify(props.pagenationInfo)]);

  return (
    <PagenationContainer>
      <PageMoveButtonsBox>
        <PageMoveFirst
          disable={props.pagenationInfo.curPage === 1}
          onClick={handleClickMoveFirst}
        >
          {"<<"}
        </PageMoveFirst>
        <PageMovePrevious
          disable={!props.pagenationInfo.isPrevious}
          onClick={handleClickMovePrevious}
        >
          {"<"}
        </PageMovePrevious>
      </PageMoveButtonsBox>
      {totalPageArr.length <= 10 ? fullSizeButtons : remainSizeButtons}
      <PageMoveButtonsBox>
        <PageMoveNext
          disable={!props.pagenationInfo.isNext}
          onClick={handleClickMoveNext}
        >
          {">"}
        </PageMoveNext>
        <PageMoveLast
          disable={props.pagenationInfo.curPage === totalPageArr.length}
          onClick={handleClickMoveLast}
        >
          {">>"}
        </PageMoveLast>
      </PageMoveButtonsBox>
    </PagenationContainer>
  );
};

export { Pagenation };

const PagenationContainer = styled.div`
  display: flex;
  margin: 10px auto 0px auto;
  width: 600px;
  justify-content: space-between;
  align-items: center;
`;

const PageMoveButtonsBox = styled.div`
  display: flex;
  width: 90px;
  justify-content: space-between;
`;

const PageMoveButton = styled.button<{ disable: boolean }>`
  cursor: pointer;
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 100%;
  color: white;
  font-family: "BMJUA";
  font-size: 1.5rem;
  background: ${(props) => {
    if (props.disable) return props.theme.secondaryColor;
    return props.theme.primaryColor;
  }};
  transition: background-color 0.5s;
  :hover {
    background-color: ${(props) => props.theme.visitedColor};
    color: white;
  }
`;

const PageMoveFirst = styled(PageMoveButton)``;
const PageMovePrevious = styled(PageMoveButton)``;
const PageMoveLast = styled(PageMoveButton)``;
const PageMoveNext = styled(PageMoveButton)``;
