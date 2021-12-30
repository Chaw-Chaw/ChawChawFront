import { createAsyncThunk } from "@reduxjs/toolkit";
import { SEARCH_POST_API_URL } from "../../constants";
import { SEARCH_LANGUAGE } from "../../constants/chart";
import { PostCardProps, SearchPostCardProps } from "../../types/post";
import { DefaultResponseBody } from "../../types/response";
import { request } from "../../utils/request";

export const getPostCardList = createAsyncThunk(
  "post/getPostCardList",
  async (searchCondition: SearchPostCardProps) => {
    const response = await request.get<DefaultResponseBody<PostCardProps[]>>(
      SEARCH_POST_API_URL,
      { params: searchCondition }
    );
    return response.data.data;
  }
);
