import { useContext } from "react";
import { BlockListItemType } from "../../types/block";
import {
  BLOCK_API_URL,
  GET_BLOCKLIST_API_URL,
  MANAGE_BLOCK_API_URL,
  MANAGE_UNBLOCK_API_URL,
  UNBLOCK_API_URL,
} from "../../constants/apiUrls";
import { AuthContext } from "../../store/AuthContext";
import { arrayRemovedItem } from "../../utils";
import { useApi } from "./useApi";

export const useBlock = () => {
  const { sendPost, sendDelete, sendGet } = useApi();
  const { user, updateUser } = useContext(AuthContext);

  const blockUser = async (userId: number) => {
    await sendPost<undefined>(BLOCK_API_URL, { userId });
    const newBlockIds = user.blockIds || [];
    newBlockIds.push(userId);
    updateUser({ blockIds: newBlockIds });
    return;
  };
  const unblockUser = async (userId: number) => {
    await sendDelete<undefined>(UNBLOCK_API_URL, { userId });
    const newBlockIds = arrayRemovedItem(userId, user.blockIds || []);
    updateUser({ blockIds: newBlockIds });
    return;
  };
  const manageBlockUser = async (userId: number) => {
    await sendPost<undefined>(MANAGE_BLOCK_API_URL, { userId });
    return;
  };
  const manageUnBlockUser = async (userId: number) => {
    await sendPost<undefined>(MANAGE_UNBLOCK_API_URL, {
      userId,
    });
    return;
  };
  const getBlockList = async () => {
    const { data } = await sendGet<BlockListItemType[]>(GET_BLOCKLIST_API_URL);
    return data;
  };

  return {
    blockUser,
    unblockUser,
    manageBlockUser,
    manageUnBlockUser,
    getBlockList,
  };
};
