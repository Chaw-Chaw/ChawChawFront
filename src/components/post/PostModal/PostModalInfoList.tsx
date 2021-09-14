import styled from "styled-components";
import { DropDownBox } from "../../common";

const PostModalInfoList: React.FC<{
  title: string;
  values: string[];
  mainValue: string;
}> = (props) => {
  // const valueLists = [props.mainValue, ...props.values];
  const valueLists = new Set([props.mainValue, ...props.values]);

  const colors = ["#06C074", "#5A65E8", "#4BC6DA", "#A52929"];
  return (
    <PostModalInfoListBox>
      <PostModalInfoTitle>{props.title}</PostModalInfoTitle>
      <PostModalInfoIconBox>
        {Array.from(valueLists).map((item, index) => {
          if (index === 0) {
            return (
              <DropDownMainBox>
                <DropDownMainText>main</DropDownMainText>
                <DropDownBox
                  fontWeight="900"
                  fontSize="0.5rem"
                  width="80px"
                  height="30px"
                  color="white"
                  value={item}
                  backgroundColor={colors[index % 4]}
                />
              </DropDownMainBox>
            );
          } else {
            return (
              <DropDownOutline key={index}>
                <DropDownBox
                  fontWeight="900"
                  fontSize="0.5rem"
                  width="80px"
                  height="30px"
                  color="white"
                  value={item}
                  backgroundColor={colors[index % 4]}
                />
              </DropDownOutline>
            );
          }
        })}
      </PostModalInfoIconBox>
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
