import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { SelectInfoDropDown } from "../common";

interface PostOrderProps {
  sortInfo: string[];
  setSortInfo: Dispatch<SetStateAction<string[]>>;
}

const orderOptions: {
  [index: string]: string;
} = {
  최신: "date",
  조회수: "view",
  좋아요: "like",
};

const PostOrder: React.FC<PostOrderProps> = (props) => {
  return (
    <PostOrderBox>
      <DropDownBox>
        <SelectInfoBox>
          <SelectInfoDropDown
            search
            type="language"
            backgroundColor="white"
            width="150px"
            color="#FF8A00"
            initialValue="선택언어"
            fontSize="0.9rem"
            setValues={props.setSortInfo}
            index={0}
            value={props.sortInfo[0]}
          />
        </SelectInfoBox>
        <SelectInfoBox>
          <SelectInfoDropDown
            search
            type="language"
            backgroundColor="white"
            color="#FF8A00"
            width="150px"
            initialValue="선택희망언어"
            fontSize="0.9rem"
            setValues={props.setSortInfo}
            index={1}
            value={props.sortInfo[1]}
          />
        </SelectInfoBox>
        <SelectInfoBox>
          <SelectInfoDropDown
            search
            width="100px"
            backgroundColor="white"
            color="#FF8A00"
            options={Object.keys(orderOptions)}
            initialValue="순서"
            fontSize="0.9rem"
            setValues={props.setSortInfo}
            index={2}
            value={props.sortInfo[2]}
          />
        </SelectInfoBox>
      </DropDownBox>
      <ExplainIcons>
        <span>🗣 : Mother Language</span>
        <span>📖 : Want to learn this language</span>
      </ExplainIcons>
    </PostOrderBox>
  );
};

export default PostOrder;
export { orderOptions, PostOrderBox, SelectInfoBox };

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
