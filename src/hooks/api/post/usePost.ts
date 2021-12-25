import {
  PostCardProps,
  PostModalInfoProps,
  SearchPostCardProps,
} from "../../../types/post";
import { GET_POSTMODAL_API_URL, SEARCH_POST_API_URL } from "../../../constants";
import { useApi } from "../useApi";

export const usePost = () => {
  const { sendGet } = useApi();
  const getPostModalData = async (userId: number) => {
    const { data } = await sendGet<PostModalInfoProps>(
      GET_POSTMODAL_API_URL + `/${userId}`
    );
    return data;
  };
  const getPostCardList = async (params: SearchPostCardProps) => {
    const { data } = await sendGet<PostCardProps[]>(
      SEARCH_POST_API_URL,
      params
    );
    return data;
  };

  return { getPostModalData, getPostCardList };
};
