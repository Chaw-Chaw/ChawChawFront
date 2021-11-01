import {
  DELETE_USER_API_URL,
  MANAGE_DELETE_USER_API_URL,
} from "../../../constants";
import { useApi } from "../useApi";
export const useDeleteUser = () => {
  const { sendDelete } = useApi();
  const deleteManageUser = async (userId: number) => {
    await sendDelete<undefined>(MANAGE_DELETE_USER_API_URL, { userId });
  };

  const deleteUser = async () => {
    await sendDelete<undefined>(DELETE_USER_API_URL);
  };

  return { deleteManageUser, deleteUser };
};
