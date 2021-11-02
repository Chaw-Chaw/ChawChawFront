import { useEffect, useState } from "react";
import styled from "styled-components";
import { useBlock } from "../../hooks/api/useBlock";
import { ListItem } from "../common";
import { SettingBlockItem } from "./SettingBlockItem";

interface BlockItem {
  userId: number;
  name: string;
  imageUrl: string;
}

const SettingBlockList: React.FC = () => {
  const { getBlockList } = useBlock();
  const [blockList, setBlockList] = useState<BlockItem[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getBlockList();
      setBlockList(data);
    })();
  }, []);

  const emptyBlockList = (
    <EmptyBlockList>
      <EmptyBlockListPhrase>🗑 차단 목록이 비어있습니다.</EmptyBlockListPhrase>
    </EmptyBlockList>
  );

  const settingBlockList = blockList.map((item) => {
    return (
      <SettingBlockItem
        key={item.userId}
        userId={item.userId}
        name={item.name}
        imageUrl={item.imageUrl}
      />
    );
  });

  return (
    <ListItem title="차단목록">
      <SettingBlockBox>
        {blockList.length > 0 ? settingBlockList : emptyBlockList}
      </SettingBlockBox>
    </ListItem>
  );
};

export { SettingBlockList };
export type { BlockItem };

const SettingBlockBox = styled.div`
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
