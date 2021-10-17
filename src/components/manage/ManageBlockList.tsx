import styled from "styled-components";
import { ListItem } from "../common";
import { ManageBlockItem } from "./ManageBlockItem";

interface BlockItem {
  userId: number;
  name: string;
  imageUrl: string;
}

const ManageBlockList: React.FC<{ blockList: BlockItem[] }> = (props) => {
  return (
    <ListItem title="차단목록">
      <ManageBlockBox>
        {props.blockList.length > 0 ? (
          props.blockList.map((item, index) => {
            return (
              <ManageBlockItem
                key={index}
                userId={item.userId}
                name={item.name}
                imageUrl={item.imageUrl}
              />
            );
          })
        ) : (
          <EmptyBlockList>
            <EmptyBlockListPhrase>
              🗑 차단 목록이 비어있습니다.
            </EmptyBlockListPhrase>
          </EmptyBlockList>
        )}
      </ManageBlockBox>
    </ListItem>
  );
};

export { ManageBlockList };
export type { BlockItem };

const ManageBlockBox = styled.div`
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const EmptyBlockList = styled.div`
  width: 100%;
  display: flex;
  height: 40px;
`;

const EmptyBlockListPhrase = styled.span`
  margin: auto;
  color: ${(props) => props.theme.secondaryColor};
`;
