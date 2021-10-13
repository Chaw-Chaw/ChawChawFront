import axios from "axios";
import Image from "next/image";
import { MouseEventHandler, useContext, useState } from "react";
import styled from "styled-components";
import { DEFAULT_PROFILE_IMAGE } from "../../constants";
import { AuthContext } from "../../store/AuthContext";
import { getSecureLocalStorage } from "../../utils";
import { Button } from "../common";
import { BlockItem } from "./ManageBlockList";

interface BlockItemProps extends BlockItem {}

const ManageBlockItem: React.FC<BlockItemProps> = (props) => {
  const { grantRefresh } = useContext(AuthContext);
  const [isBlock, setIsBlock] = useState(true);
  const manageUnblockUser = async (userId: number) => {
    const response = await axios
      .delete("/admin/users/block", {
        data: { userId: userId },
        headers: {
          Authorization: getSecureLocalStorage("accessToken"),
        },
      })
      .catch((err) => err.response);

    if (response.status === 401) {
      grantRefresh();
      return false;
    }
    console.log(response, "유저 차단해제 결과");
    if (!response.data.isSuccess) {
      alert("유저 차단해제 실패");
      return false;
    }

    return true;
  };

  const manageBlockUser = async (userId: number) => {
    const response = await axios
      .post(
        `/amdin/users/block`,
        { userId },
        {
          headers: {
            Authorization: getSecureLocalStorage("accessToken"),
          },
        }
      )
      .catch((err) => err.response);

    if (response.status === 401) {
      grantRefresh();
      return false;
    }

    console.log(response, "유저 차단 결과");
    if (!response.data.isSuccess) {
      alert("유저 차단 실패");
      return false;
    }

    return true;
  };

  const UnblockUserButtonHandler: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    (async () => {
      const result = manageUnblockUser(props.userId);
      if (!result) return;
      setIsBlock(false);
    })();
  };

  const blockUserButtonHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    (async () => {
      const result = manageBlockUser(props.userId);
      if (!result) return;
      setIsBlock(true);
    })();
  };

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
