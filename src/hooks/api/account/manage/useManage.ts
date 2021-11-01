import { SearchConditionType, UserListType } from "../../../../../types/manage";
import { MANAGE_USERLIST_API_URL } from "../../../../constants";
import { useApi } from "../../useApi";

export const useManage = () => {
  const { sendGet } = useApi();

  const takeUserList = async (searchCondition: SearchConditionType) => {
    const { data } = await sendGet<UserListType>(
      MANAGE_USERLIST_API_URL,
      searchCondition
    );
    return data;
  };

  return { takeUserList };
};
