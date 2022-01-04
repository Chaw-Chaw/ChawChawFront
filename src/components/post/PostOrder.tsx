import React from "react";
import styled from "styled-components";
import { PostOrderProps } from "../../types/post";
import { SelectInfoDropDown } from "../common";
import { selectItemInfoList } from "../../constants/order";

const PostOrder: React.FC<PostOrderProps> = (props) => {
  const selectItemList = selectItemInfoList.map((item) => {
    return (
      <SelectInfoBox key={item.id}>
        <SelectInfoDropDown
          options={item.options}
          setValues={props.setSortInfo}
          index={item.id}
          value={props.sortInfo[item.id]}
          fontWeight="900"
          height="30px"
          type="SEARCH"
          backgroundColor="white"
          width="150px"
          color="#FF8A00"
          initialValue={item.initialValue}
          fontSize="0.9rem"
        />
      </SelectInfoBox>
    );
  });

  return (
    <PostOrderBox>
      <DropDownBox>{selectItemList}</DropDownBox>
      <ExplainIcons>
        <span>🗣 : Mother Language</span>
        <span>📖 : Want to learn this language</span>
      </ExplainIcons>
    </PostOrderBox>
  );
};

export default React.memo(PostOrder);
export { PostOrderBox, SelectInfoBox };

const ExplainIcons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  span {
    margin-left: 10px;
  }
  /* margin-: auto; */
  @media (max-width: 768px) {
    display: none;
  }
`;

const PostOrderBox = styled.div`
  margin: 20px 0px 20px 0px;
  width: 100%;
  min-height: 50px;
  display: flex;
  justify-content: flex-start;
`;

const DropDownBox = styled.div`
  width: 450px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 500px) {
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

const SelectInfoBox = styled.div`
  margin: 2px 2px 2px 2px;
`;
