import styled from "styled-components";
import { SelectInfoDropDown, DropDown } from "../../components/common";

const PostOrderBox = styled.div`
  margin: 20px 0px 0px 0px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
`;

const DropDownBox = styled.div`
  min-width: 400px;
  width: 450px;
  display: flex;
  justify-content: space-between;
`;

const PostOrder: React.FC = (props) => {
  const orderOptions = ["최신", "조회수", "좋아요"];
  return (
    <PostOrderBox>
      <DropDownBox>
        <SelectInfoDropDown
          postOrder
          type="language"
          backgroundColor="white"
          width="150px"
          color="#FF8A00"
          initialValue="Mother Language"
          fontSize="0.9rem"
        />
        <SelectInfoDropDown
          postOrder
          type="language"
          backgroundColor="white"
          color="#FF8A00"
          width="150px"
          initialValue="Learning Language"
          fontSize="0.9rem"
        />
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
      </DropDownBox>
    </PostOrderBox>
  );
};

export default PostOrder;
