import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { SelectInfoDropDown, DropDown } from "../../components/common";
interface PostOrderProps {
  setSortInfo: Dispatch<SetStateAction<string[]>>;
}

const PostOrder: React.FC<PostOrderProps> = (props) => {
  return (
    <PostOrderBox>
      <DropDownBox>
        <SelectInfoBox>
          <SelectInfoDropDown
            postOrder
            type="language"
            backgroundColor="white"
            width="150px"
            color="#FF8A00"
            initialValue="Main Language"
            fontSize="0.9rem"
            setValues={props.setSortInfo}
            index={0}
          />
        </SelectInfoBox>
        <SelectInfoBox>
          <SelectInfoDropDown
            postOrder
            type="language"
            backgroundColor="white"
            color="#FF8A00"
            width="150px"
            initialValue="Hope Language"
            fontSize="0.9rem"
            setValues={props.setSortInfo}
            index={1}
          />
        </SelectInfoBox>
        <SelectInfoBox>
          <SelectInfoDropDown
            postOrder
            width="100px"
            type="language"
            backgroundColor="white"
            color="#FF8A00"
            options={Object.keys(orderOptions)}
            initialValue="order"
            fontSize="0.9rem"
            setValues={props.setSortInfo}
            index={2}
          />
        </SelectInfoBox>
      </DropDownBox>
    </PostOrderBox>
  );
};

export default PostOrder;
export { orderOptions };

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

const orderOptions: any = {
  order: "",
  최신: "date",
  조회수: "view",
  좋아요: "like",
};
