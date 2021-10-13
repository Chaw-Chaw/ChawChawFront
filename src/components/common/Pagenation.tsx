import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { pagenationInfoType } from "../../pages/manage/users";

const Pagenation: React.FC<{
  pagenationInfo: pagenationInfoType;
  selectedPageNumber: number;
  setSelectedPageNumber: Dispatch<SetStateAction<number>>;
  contentCounts: number;
}> = (props) => {
  const [totalPageArr, setTotalPageArr] = useState<number[]>([0]);
  const [middlePageNum, setMiddlePageNum] = useState(0);
  const startPage = 1;

  useEffect(() => {
    // pagenation 이 초기상태라면 넘김
    if (props.pagenationInfo.curPage === 0) return;
    const totalPageCount = props.pagenationInfo.totalCnt / props.contentCounts;
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
      <PageMoveButton
        disable={props.pagenationInfo.curPage === startPage}
        onClick={(e) => {
          e.preventDefault();
          if (props.pagenationInfo.curPage === startPage) return;
          props.setSelectedPageNumber(props.pagenationInfo.curPage - 1);
        }}
      >
        {"<"}
      </PageMoveButton>
      {totalPageArr.length <= 5 ? (
        totalPageArr.map((item, index) => {
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
      ) : (
        <>
          <PageButton
            pageNum={startPage}
            currentNum={props.pagenationInfo.curPage}
            onClick={(e) => {
              e.preventDefault();
              props.setSelectedPageNumber(startPage);
            }}
          >
            {startPage}
          </PageButton>
          <PageButton
            pageNum={startPage + 1}
            currentNum={props.pagenationInfo.curPage}
            onClick={(e) => {
              e.preventDefault();
              if (props.pagenationInfo.curPage - startPage > 2) return;
              props.setSelectedPageNumber(startPage + 1);
            }}
          >
            {props.pagenationInfo.curPage - startPage > 2
              ? "..."
              : startPage + 1}
          </PageButton>
          <PageButton
            pageNum={middlePageNum}
            currentNum={props.pagenationInfo.curPage}
            onClick={(e) => {
              e.preventDefault();
              props.setSelectedPageNumber(middlePageNum);
            }}
          >
            {middlePageNum}
          </PageButton>
          <PageButton
            pageNum={totalPageArr.length - 1}
            currentNum={props.pagenationInfo.curPage}
            onClick={(e) => {
              e.preventDefault();
              if (totalPageArr.length - props.pagenationInfo.curPage > 2)
                return;
              props.setSelectedPageNumber(totalPageArr.length - 1);
            }}
          >
            {totalPageArr.length - props.pagenationInfo.curPage > 2
              ? "..."
              : totalPageArr.length - 1}
          </PageButton>
          <PageButton
            pageNum={totalPageArr.length}
            currentNum={props.pagenationInfo.curPage}
            onClick={(e) => {
              e.preventDefault();
              props.setSelectedPageNumber(totalPageArr.length);
            }}
          >
            {totalPageArr.length}
          </PageButton>
        </>
      )}
      <PageMoveButton
        disable={props.pagenationInfo.curPage === totalPageArr.length}
        onClick={(e) => {
          e.preventDefault();
          if (props.pagenationInfo.curPage === totalPageArr.length) return;
          props.setSelectedPageNumber(props.pagenationInfo.curPage + 1);
        }}
      >
        {">"}
      </PageMoveButton>
    </PagenationContainer>
  );
};

export { Pagenation };

const PagenationContainer = styled.div`
  display: flex;
  margin: 10px auto 0px auto;
  width: 400px;
  justify-content: space-between;
  align-items: center;
`;

const PageMoveButton = styled.button<{ disable: boolean }>`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 100%;
  color: white;
  font-family: "BMJUA";
  font-size: 1.5rem;
  background: ${(props) => {
    if (props.disabled) return props.theme.secondaryColor;
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
