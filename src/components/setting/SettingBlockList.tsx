import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ADMIN_ROLE } from "../../constants";
import { useAppDispatch } from "../../hooks/redux";
import { getBlockList } from "../../store/actions/profileActions";
import { BlockItem } from "../../types/manage";
import { userRole } from "../../utils";
import { ListItem } from "../common";
import { SettingBlockItem } from "./SettingBlockItem";

const MSettingBlockList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [blockList, setBlockList] = useState<BlockItem[]>([]);

  useEffect(() => {
    if (userRole() === ADMIN_ROLE) return;
    (async () => {
      const data = await dispatch(getBlockList()).unwrap();
      setBlockList(data);
    })();
  }, [dispatch]);

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

const SettingBlockList = React.memo(MSettingBlockList);
export { SettingBlockList };

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
