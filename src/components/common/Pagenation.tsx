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
}> = (props) => {
  const [totalPageArr, setTotalPageArr] = useState(
    Array.from(
      {
        length:
          props.pagenationInfo.endPage - props.pagenationInfo.startPage + 1,
      },
      (v, i) => i + 1
    )
  );
  const [middlePageNum, setMiddlePageNum] = useState(3);

  useEffect(() => {
    setTotalPageArr(
      Array.from(
        {
          length:
            props.pagenationInfo.endPage - props.pagenationInfo.startPage + 1,
        },
        (v, i) => i + 1
      )
    );
    const middlePage = (() => {
      if (props.pagenationInfo.endPage - props.pagenationInfo.startPage <= 5) {
        return 0;
      }
      // 현재 페이지가 start페이지에 가까울 때
      if (props.pagenationInfo.curPage - props.pagenationInfo.startPage <= 2) {
        return props.pagenationInfo.startPage + 2;
      }
      if (props.pagenationInfo.endPage - props.pagenationInfo.curPage <= 2) {
        return props.pagenationInfo.endPage - 2;
      }
      return props.pagenationInfo.curPage;
    })();
    setMiddlePageNum(middlePage);
  }, [JSON.stringify(props.pagenationInfo)]);

  return (
    <PagenationContainer>
      <PageMoveButton
        onClick={(e) => {
          e.preventDefault();
          if (props.pagenationInfo.curPage === props.pagenationInfo.startPage)
            return;
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
            pageNum={props.pagenationInfo.startPage}
            currentNum={props.pagenationInfo.curPage}
            onClick={(e) => {
              e.preventDefault();
              props.setSelectedPageNumber(props.pagenationInfo.startPage);
            }}
          >
            {props.pagenationInfo.startPage}
          </PageButton>
          <PageButton
            pageNum={props.pagenationInfo.startPage + 1}
            currentNum={props.pagenationInfo.curPage}
            onClick={(e) => {
              e.preventDefault();
              if (
                props.pagenationInfo.curPage - props.pagenationInfo.startPage >
                2
              )
                return;
              props.setSelectedPageNumber(props.pagenationInfo.startPage + 1);
            }}
          >
            {props.pagenationInfo.curPage - props.pagenationInfo.startPage > 2
              ? "..."
              : props.pagenationInfo.startPage + 1}
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
            pageNum={props.pagenationInfo.endPage - 1}
            currentNum={props.pagenationInfo.curPage}
            onClick={(e) => {
              e.preventDefault();
              if (
                props.pagenationInfo.endPage - props.pagenationInfo.curPage >
                2
              )
                return;
              props.setSelectedPageNumber(props.pagenationInfo.endPage - 1);
            }}
          >
            {props.pagenationInfo.endPage - props.pagenationInfo.curPage > 2
              ? "..."
              : props.pagenationInfo.endPage - 1}
          </PageButton>
          <PageButton
            pageNum={props.pagenationInfo.endPage}
            currentNum={props.pagenationInfo.curPage}
            onClick={(e) => {
              e.preventDefault();
              props.setSelectedPageNumber(props.pagenationInfo.endPage);
            }}
          >
            {props.pagenationInfo.endPage}
          </PageButton>
        </>
      )}

      <PageMoveButton
        onClick={(e) => {
          e.preventDefault();
          if (props.pagenationInfo.curPage === props.pagenationInfo.endPage)
            return;
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

const PageMoveButton = styled.button`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 100%;
  color: white;
  font-family: "BMJUA";
  font-size: 1.5rem;
  background: ${(props) => props.theme.primaryColor};
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
