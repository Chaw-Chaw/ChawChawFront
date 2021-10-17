import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { pagenationInfoType } from "../../pages/manage/users";

const Pagenation: React.FC<{
  pagenationInfo: pagenationInfoType;
  selectedPageNumber: number;
  setSelectedPageNumber: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const [totalPageArr, setTotalPageArr] = useState<number[]>([0]);
  const [middlePageNum, setMiddlePageNum] = useState(0);
  const startPage = 1;
  const pagenationSizeArr = Array.from(
    {
      length: props.pagenationInfo.endPage - props.pagenationInfo.startPage + 1,
    },
    (v, i) => i + props.pagenationInfo.startPage
  );

  useEffect(() => {
    // pagenation 이 초기상태라면 넘김
    if (props.pagenationInfo.curPage === 0) return;
    const totalPageCount = Math.ceil(props.pagenationInfo.totalCnt / 10);
    setTotalPageArr(Array.from({ length: totalPageCount }, (v, i) => i + 1));
    const middlePage = (() => {
      if (totalPageCount <= 5) {
        return 0;
      }
      // 현재 페이지가 start페이지에 가까울 때
      if (props.pagenationInfo.curPage - startPage <= 2) {
        return startPage + 2;
      }
      // 현재 페이지가 전체 페이지수 에 가까울 때
      if (totalPageCount - props.pagenationInfo.curPage <= 2) {
        return totalPageCount - 2;
      }
      return props.pagenationInfo.curPage;
    })();
    setMiddlePageNum(middlePage);
  }, [JSON.stringify(props.pagenationInfo)]);

  return (
    <PagenationContainer>
      <PageMoveButtonsBox>
        <PageMoveButton
          disable={props.pagenationInfo.curPage === 1}
          onClick={(e) => {
            e.preventDefault();
            if (props.pagenationInfo.curPage === 1) return;
            props.setSelectedPageNumber(1);
          }}
        >
          {"<<"}
        </PageMoveButton>
        <PageMoveButton
          disable={!props.pagenationInfo.isPrevious}
          onClick={(e) => {
            e.preventDefault();
            if (!props.pagenationInfo.isPrevious) return;
            props.setSelectedPageNumber(props.pagenationInfo.startPage - 1);
          }}
        >
          {"<"}
        </PageMoveButton>
      </PageMoveButtonsBox>
      {totalPageArr.length <= 10
        ? totalPageArr.map((item, index) => {
            return (
              <PageButton
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  props.setSelectedPageNumber(item);
                }}
                pageNum={item}
                currentNum={props.pagenationInfo.curPage}
              >
                {item}
              </PageButton>
            );
          })
        : pagenationSizeArr.map((item, index) => {
            return (
              <PageButton
                key={index}
                pageNum={item}
                currentNum={props.pagenationInfo.curPage}
                onClick={(e) => {
                  e.preventDefault();
                  props.setSelectedPageNumber(item);
                }}
              >
                {item}
              </PageButton>
            );
          })}
      <PageMoveButtonsBox>
        <PageMoveButton
          disable={!props.pagenationInfo.isNext}
          onClick={(e) => {
            e.preventDefault();
            if (!props.pagenationInfo.isNext) return;
            props.setSelectedPageNumber(props.pagenationInfo.endPage + 1);
          }}
        >
          {">"}
        </PageMoveButton>
        <PageMoveButton
          disable={props.pagenationInfo.curPage === totalPageArr.length}
          onClick={(e) => {
            e.preventDefault();

            if (props.pagenationInfo.curPage === totalPageArr.length) return;
            props.setSelectedPageNumber(totalPageArr.length);
          }}
        >
          {">>"}
        </PageMoveButton>
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

const PageButton = styled.button<{ pageNum: number; currentNum: number }>`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 100%;
  color: ${(props) => (props.currentNum === props.pageNum ? "white" : "black")};
  font-family: "BMJUA";
  background: ${(props) =>
    props.currentNum === props.pageNum
      ? `${props.theme.primaryColor}`
      : "none"};
  transition: background-color 0.5s;
  :hover {
    background-color: ${(props) => props.theme.visitedColor};
    color: white;
  }
`;
