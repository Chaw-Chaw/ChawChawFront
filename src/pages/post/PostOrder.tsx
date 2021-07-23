import styled from "styled-components";
import { SelectInfoDropDown, DropDown } from "../../components/common";

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

const PostOrder: React.FC = (props) => {
  const orderOptions = ["최신", "조회수", "좋아요"];
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
            initialValue="Mother Language"
            fontSize="0.9rem"
          />
        </SelectInfoBox>
        <SelectInfoBox>
          <SelectInfoDropDown
            postOrder
            type="language"
            backgroundColor="white"
            color="#FF8A00"
            width="150px"
            initialValue="Learning Language"
            fontSize="0.9rem"
          />
        </SelectInfoBox>
        <SelectInfoBox>
          <SelectInfoDropDown
            postOrder
            width="100px"
            type="language"
            backgroundColor="white"
            color="#FF8A00"
            options={orderOptions}
            initialValue="order"
            fontSize="0.9rem"
          />
        </SelectInfoBox>
      </DropDownBox>
    </PostOrderBox>
  );
};

export default PostOrder;
