import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import { useAlert } from "react-alert";
import styled from "styled-components";
import { DEFAULT_PROFILE_IMAGE } from "../../constants";
import { useBlock } from "../../hooks/api/useBlock";
import { getSecureLocalStorage } from "../../utils";
import { Button } from "../common";
import { BlockItem } from "./ManageBlockList";

interface BlockItemProps extends BlockItem {}

const ManageBlockItem: React.FC<BlockItemProps> = (props) => {
  const { manageBlockUser, manageUnBlockUser } = useBlock();
  const [isBlock, setIsBlock] = useState(true);

  const handleClickUnblock: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    (async () => {
      await manageUnBlockUser(props.userId);
      setIsBlock(false);
    })();
  };

  const handleClickblock: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    (async () => {
      await manageBlockUser(props.userId);
      setIsBlock(true);
    })();
  };

  const blockButton = isBlock ? (
    <UnblockButton onClick={handleClickUnblock}>차단 해제</UnblockButton>
  ) : (
    <BlockButton onClick={handleClickblock}>차단</BlockButton>
  );

  return (
    <BlockBox>
      <BlockImageBox>
        <Image
          src={props.imageUrl || DEFAULT_PROFILE_IMAGE}
          alt="프로필 이미지"
          width="50px"
          height="50px"
          objectFit="cover"
          className="block-user-image"
        />
      </BlockImageBox>
      <BlockItemInfo>
        <BlockItemName>{props.name}</BlockItemName>
        <BlockItemDescription>메세지 차단, 알림 차단</BlockItemDescription>
      </BlockItemInfo>
      {blockButton}
    </BlockBox>
  );
};

export { ManageBlockItem };

const BlockBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 65px;
  padding: 5px;
  box-sizing: border-box;
  border-bottom: 1px solid ${(props) => props.theme.secondaryColor};
`;

const BlockItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: auto;
  margin-left: 20px;
`;
const BlockItemName = styled.h3`
  margin: 0 0 5px 0;
`;

const BlockImageBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  position: relative;
  .block-user-image {
    border-radius: 100%;
  }
`;

const UnblockButton = styled(Button)`
  background-color: #1ec997;
  border-radius: 10px;
  border: none;
`;

const BlockItemDescription = styled.span`
  color: ${(props) =>
    props.theme.id === "light" ? "rgb(0, 0, 0, 0.5)" : "white"};
`;

const BlockButton = styled(UnblockButton)`
  background-color: rgba(255, 107, 107, 1);
`;
