import styled from "styled-components";
import { SELECT_COLORS } from "../../../constants";
import { divideMain } from "../../../utils";
import { DropDownBox } from "../../common";

const PostModalInfoList: React.FC<{
  title: string;
  values: string[];
  mainValue: string;
}> = (props) => {
  const valueLists = divideMain(props.mainValue, props.values);

  const selectItemList = valueLists.map((item, index) => {
    if (item === props.mainValue) {
      return (
        <DropDownMainBox key={item}>
          <DropDownMainText>main</DropDownMainText>
          <DropDownBox
            fontWeight="900"
            fontSize="0.5rem"
            width="80px"
            height="30px"
            color="white"
            value={item}
            backgroundColor={SELECT_COLORS[index % 4]}
            onClick={() => {}}
          />
        </DropDownMainBox>
      );
    }
    return (
      <DropDownOutline key={item}>
        <DropDownBox
          fontWeight="900"
          fontSize="0.5rem"
          width="80px"
          height="30px"
          color="white"
          value={item}
          backgroundColor={SELECT_COLORS[index % 4]}
          onClick={() => {}}
        />
      </DropDownOutline>
    );
  });

  return (
    <PostModalInfoListBox>
      <PostModalInfoTitle>{props.title}</PostModalInfoTitle>
      <PostModalInfoIconBox>{selectItemList}</PostModalInfoIconBox>
    </PostModalInfoListBox>
  );
};

export { PostModalInfoListBox, PostModalInfoList, PostModalInfoTitle };

const PostModalInfoTitle = styled.h2`
  font-size: 1rem;
  margin: 0px;
  width: 150px;
  max-width: 110px;
`;

const PostModalInfoListBox = styled.div`
  padding: 10px 20px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const PostModalInfoIconBox = styled.div`
  gap: 2px 2px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const DropDownOutline = styled.div`
  margin-right: 0px;
`;

const DropDownMainBox = styled(DropDownOutline)`
  padding: 5px;
  border-radius: 20rem;
  position: relative;
  border: 2px solid ${(props) => props.theme.primaryColor};
`;

const DropDownMainText = styled.div`
  padding: 0px 10px;
  color: ${(props) => props.theme.primaryColor};
  position: absolute;
  top: -15px;
  left: 50%;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  transform: translateX(-50%);
`;
