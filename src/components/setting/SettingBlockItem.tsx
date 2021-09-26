import Image from "next/image";
import { MouseEventHandler, useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../store/AuthContext";
import { ChatContext } from "../../store/ChatContext";
import { Button } from "../common";
import { BlockItem } from "./SettingBlockList";

interface BlockItemProps extends BlockItem {}

const SettingBlockItem: React.FC<BlockItemProps> = (props) => {
  const { unblockUser, blockUser } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const [isBlock, setIsBlock] = useState(user.blockIds?.includes(props.userId));

  const UnblockUserButtonHandler: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    unblockUser(props.userId);
    setIsBlock(false);
  };

  const blockUserButtonHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    blockUser(props.userId);
    setIsBlock(true);
  };

  return (
    <BlockBox>
      <BlockImageBox>
        <Image
          src={props.imageUrl}
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
      {isBlock ? (
        <UnblockButton onClick={UnblockUserButtonHandler}>
          차단 해제
        </UnblockButton>
      ) : (
        <BlockButton onClick={blockUserButtonHandler}>차단</BlockButton>
      )}
    </BlockBox>
  );
};

export { SettingBlockItem };

const BlockBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 65px;
  padding: 5px;
  /* margin-left: 40px; */
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
  /* animation: slide-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @keyframes slide-left {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(100px);
      transform: translateX(100px);
    }
  } */
`;
