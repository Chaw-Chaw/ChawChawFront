import { LIKE_API_URL, UNLIKE_API_URL } from "../../constants";
import { useApi } from "./useApi";

export const useLike = () => {
  const { sendPost, sendDelete } = useApi();
  const like = async (userId: number) => {
    await sendPost<undefined>(LIKE_API_URL, { userId });
  };
  const unLike = async (userId: number) => {
    await sendDelete<undefined>(UNLIKE_API_URL, { userId });
  };
  return { like, unLike };
};
